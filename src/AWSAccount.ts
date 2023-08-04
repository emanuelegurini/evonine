const { execSync } = require("child_process");
import { AWSNetworkOperator } from "./AWSNetworkOperations";

export class AWSAccount {
  /**
   * TODO: Add property description
   */
  private name: string;

  /**
   * TODO: Add property description
   */
  private region: string;

  /**
   * TODO: Add property description
   */
  private stackNamesList: Array<string>;

  /**
   * TODO: Add property description
   */
  private awsNetworkOperator: AWSNetworkOperator;

  /**
   * TODO: Add property description
   */
  private isStacksChecked: boolean;

  constructor() {
    this.awsNetworkOperator = new AWSNetworkOperator();
    this.isStacksChecked = false;
  }

  /**
   *
   */
  public getRegion(): string {
    return this.region;
  }

  /**
   *
   */
  public setRegion(region: string): void {
    if (region === null) throw new Error("Regions should not be null");
    this.region = region;
  }

  /**
   * TODO: Add method description
   * @returns boolean
   */
  public getStackNamesFromStackList(): boolean {
    try {
      const stackNames: string = this.awsNetworkOperator.fetchStackList(
        this.region
      );
      this.stackNamesList = stackNames
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

  /**
   * TODO: Add method description
   */
  public getStackNameList(): Array<string> {
    if (!this.stackNamesList) this.getStackNamesFromStackList();

    return this.stackNamesList;
  }

  /**
   *
   */
  public checkAllStacks(): boolean {
    try {
      if (!this.stackNamesList) {
        this.getStackNamesFromStackList();
      }

      if (this.stackNamesList && this.stackNamesList.length > 0) {
        for (let i = 0; i < this.stackNamesList.length; i++) {
          const stackName = this.stackNamesList[i];
          const region = this.region;
          let index = i + 1;
          console.log(
            `[Stack ${index} / ${this.stackNamesList.length}] - ${stackName}`
          );

          this.awsNetworkOperator.detectStackDrift(stackName, region);
        }
      }
      this.isStacksChecked = true;
      return true;
    } catch (error: unknown) {
      console.error("An error occurred while checking the stacks:", error);
      return false;
    }
  }

  /**
   *
   */
  public getAllDriftedStack(): string {
    try {
      return this.awsNetworkOperator.getAllDriftedStacks(this.region);
    } catch (error: unknown) {
      return "All stacks are in sync";
    }
  }

  /**
   *
   */
  public getAllStackWithStatus(): string {
    if (!this.isStacksChecked) {
      this.checkAllStacks();
    }

    return this.awsNetworkOperator.getAllStackWithStatus(this.region);
  }
}
