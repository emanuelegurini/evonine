const { execSync, exec } = require("child_process");

export class AWSAccount {
  private name: string;
  private region: string;
  constructor(region: string) {
    if (region === null) throw new Error("Regions should not be null");
    this.region = region;
  }

  public getAllStackList(): string {
    const command = `aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE ROLLBACK_COMPLETE UPDATE_COMPLETE UPDATE_ROLLBACK_COMPLETE --region eu-west-1 --query 'sort_by(StackSummaries, &StackName)[*].[StackName, StackStatus, DriftInformation.StackDriftStatus, DriftInformation.LastCheckTimestamp]' --output table`;
    return execSync(command, { encoding: "utf-8" });
  }

  public getAllStackNames(): Array<string> {
    const stackNames = this.getAllStackList();
    return stackNames
      .trim()
      .split(/\r?\n/)
      .slice(3)
      .map((row) => row.split(/\s+/)[1]);
  }
}
