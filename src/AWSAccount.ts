const { execSync } = require("child_process");
import { AWSNetworkOperator } from "./AWSNetworkOperator";
import { IAWSAccount } from "./IAWSAccount";

export class AWSAccount implements IAWSAccount {
  //private _accountName: string;

  private _region: string;

  private _stackNamesList!: Array<string>;

  private _awsNetworkOperator: AWSNetworkOperator;

  private _isStacksChecked: boolean;

  private _driftedStacks!: string;

  private _allStackWithStatus!: string;

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

  public getCheckedStatus() {
    return this._isStacksChecked;
  }

  public checkAllStacks(): void {
    try {
      if (!this._stackNamesList) {
        this.getStackNamesFromStackList();
      }

      if (this._stackNamesList && this._stackNamesList.length > 0) {
        this.processStacks(this._stackNamesList);
      }

      this._isStacksChecked = true;
    } catch (error: unknown) {
      throw new Error("An error occurred while checking the stacks:" + error);
    }
  }

  private processStacks(stackNames: string[]): void {
    for (let i: number = 0; i < stackNames.length; i++) {
      const region = this._region;
      const stackName = stackNames[i];
      console.log(`[Stack ${i + 1} / ${stackNames.length}] - ${stackName}`);
      try {
        this._awsNetworkOperator.detectStackDrift(stackName, region);
      } catch (error) {
        throw new Error(`Error processing stack ${stackName}:` + error);
      }
    }
  }

  public getDriftedStacks(): string {
    return this._driftedStacks;
  }

  public getAllDriftedStack(): void {
    try {
      if (!this._isStacksChecked) {
        this.checkAllStacks();
      }

      this._driftedStacks = this._awsNetworkOperator.getAllDriftedStacks(
        this._region
      );
    } catch (error: unknown) {
      this._driftedStacks = "All stacks are in sync";
    }
  }

  public getAllStack(): string {
    return this._allStackWithStatus;
  }

  public getAllStackWithStatus(): void {
    try {
      if (!this._isStacksChecked) {
        this.checkAllStacks();
      }

      this._allStackWithStatus = this._awsNetworkOperator.getAllStackWithStatus(
        this._region
      );
    } catch (error: unknown) {
      throw new Error("");
    }
  }

  public getStackNamesFromStackList(): any {
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
    } catch (error: unknown) {
      throw new Error("An error occurred while retrieving the stacks:" + error);
    }
  }

  public getStackNameList(): Array<string> {
    try {
      if (!this._stackNamesList) this.getStackNamesFromStackList();
      return this._stackNamesList;
    } catch (error: unknown) {
      throw new Error("Error: " + error);
    }
  }
}
