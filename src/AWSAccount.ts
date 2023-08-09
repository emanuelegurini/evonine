import { AWSNetworkOperator } from "./AWSNetworkOperator";
import { IAWSAccount } from "./IAWSAccount";

export class AWSAccount implements IAWSAccount {
  //private _accountName: string;

  private _region: string;

  private _stackNamesList!: Array<string>;

  private _awsNetworkOperator: AWSNetworkOperator;

  private _stacksVerified: boolean;

  private _driftedStacks!: string;

  private _stackWithStatus!: string;

  constructor() {
    this._region = "";
    this._awsNetworkOperator = new AWSNetworkOperator();
    this._stacksVerified = false;
  }

  public getRegion(): string {
    return this._region;
  }

  public setRegion(region: string): void {
    if (!region) throw new Error("Regions should not be null");
    this._region = region;
  }

  public stackVerified(): boolean {
    return this._stacksVerified;
  }

  public verifyAllStacks(): void {
    try {
      if (!this._stackNamesList) {
        this.loadStackNames();
      }

      if (this._stackNamesList && this._stackNamesList.length > 0) {
        this.processStacks(this._stackNamesList);
      }

      this._stacksVerified = true;
    } catch (error: unknown) {
      throw new Error("Error while verifying the stacks: " + error);
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

  public loadDriftedStack(): void {
    try {
      if (!this._stacksVerified) {
        this.verifyAllStacks();
      }

      this._driftedStacks = this._awsNetworkOperator.fetchAllDriftedStacks(
        this._region
      );
    } catch (error: unknown) {
      this._driftedStacks = "All stacks are in sync";
    }
  }

  public getAllStackStatus(): string {
    return this._stackWithStatus;
  }

  public loadAllStackWithStatus(): void {
    try {
      if (!this._stacksVerified) {
        this.verifyAllStacks();
      }

      this._stackWithStatus = this._awsNetworkOperator.fetchAllStackStatus(
        this._region
      );
    } catch (error: unknown) {
      throw new Error("Error while fetching all stack statuses");
    }
  }

  public loadStackNames(): void {
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
      throw new Error("Error while loading the stack names: " + error);
    }
  }

  public getStackNames(): Array<string> {
    try {
      if (!this._stackNamesList) this.loadStackNames();
      return this._stackNamesList;
    } catch (error: unknown) {
      throw new Error("Error while getting stack names: " + error);
    }
  }
}
