const { execSync } = require("child_process");
import { AWSNetworkOperator } from "./AWSNetworkOperator";
import { IAWSAccount } from "./IAWSAccount";

export class AWSAccount implements IAWSAccount {
  //private _accountName: string;

  private _region: string;

  private _stackNamesList!: Array<string>;

  private _awsNetworkOperator: AWSNetworkOperator;

  _isStacksChecked: boolean;

  constructor() {
    this._region = "";
    this._awsNetworkOperator = new AWSNetworkOperator();
    this._isStacksChecked = false;
  }

  public getRegion(): string {
    return this._region;
  }

  public setRegion(region: string): void {
    if (region === null) throw new Error("Regions should not be null");
    this._region = region;
  }

  public checkAllStacks(): boolean {
    try {
      if (this._isStacksChecked) {
        return true;
      }
      if (!this._stackNamesList) {
        this.getStackNamesFromStackList();
      }

      if (this._stackNamesList && this._stackNamesList.length > 0) {
        for (let i = 0; i < this._stackNamesList.length; i++) {
          const stackName = this._stackNamesList[i];
          const region = this._region;
          let index = i + 1;
          console.log(
            `[Stack ${index} / ${this._stackNamesList.length}] - ${stackName}`
          );

          this._awsNetworkOperator.detectStackDrift(stackName, region);
        }
      }
      this._isStacksChecked = true;
      return this._isStacksChecked;
    } catch (error: unknown) {
      console.error("An error occurred while checking the stacks:", error);
      return this._isStacksChecked;
    }
  }

  public getAllDriftedStack(): string {
    try {
      if (!this._isStacksChecked) {
        this.checkAllStacks();
      }
      return this._awsNetworkOperator.getAllDriftedStacks(this._region);
    } catch (error: unknown) {
      return "All stacks are in sync";
    }
  }

  public getAllStackWithStatus(): string {
    if (!this._isStacksChecked) {
      this.checkAllStacks();
    }

    return this._awsNetworkOperator.getAllStackWithStatus(this._region);
  }

  public getStackNamesFromStackList(): boolean {
    try {
      const stackNames: string = this._awsNetworkOperator.fetchStackList(
        this._region
      );
      this._stackNamesList = stackNames
        .trim()
        .split(/\r?\n/)
        .slice(3)
        .map((row) => row.split(/\s+/)[1])
        .filter((item) => item !== undefined && item.trim() !== "");
      return true;
    } catch (error: unknown) {
      console.error("An error occurred while retrieving the stacks:", error);
      return false;
    }
  }

  public getStackNameList(): Array<string> {
    if (!this._stackNamesList) this.getStackNamesFromStackList();

    return this._stackNamesList;
  }
}
