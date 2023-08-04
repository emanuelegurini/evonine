import { execSync } from "child_process";
import { IAWSNetworkOperator } from "./INetworkOperator";

export class AWSNetworkOperator implements IAWSNetworkOperator {
  /**
   *
   */
  public fetchStackList(region: string): string {
    const command = `aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE ROLLBACK_COMPLETE UPDATE_COMPLETE UPDATE_ROLLBACK_COMPLETE --region ${region} --query 'sort_by(StackSummaries, &StackName)[*].[StackName, StackStatus, DriftInformation.StackDriftStatus, DriftInformation.LastCheckTimestamp]' --output table`;
    const result = execSync(command, { encoding: "utf-8" });
    return result;
  }

  /**
   *
   */
  public detectStackDrift(stackName: string, region: string): string {
    const command = `aws cloudformation detect-stack-drift --stack-name ${stackName} --region ${region}`;
    const result = execSync(command, { encoding: "utf-8" });
    return result;
  }

  /**
   *
   */
  public getAllStackWithStatus(region: string): string {
    const command = `aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE ROLLBACK_COMPLETE UPDATE_COMPLETE UPDATE_ROLLBACK_COMPLETE --region ${region} --query 'sort_by(StackSummaries, &StackName)[*].[StackName, StackStatus, DriftInformation.StackDriftStatus, DriftInformation.LastCheckTimestamp]' --output table`;
    const result = execSync(command, { encoding: "utf-8" });
    return result;
  }

  /**
   *
   */
  public getAllDriftedStacks(region: string): string {
    const command = `aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE ROLLBACK_COMPLETE UPDATE_COMPLETE UPDATE_ROLLBACK_COMPLETE --region ${region} --query 'sort_by(StackSummaries, &StackName)[*].[StackName, StackStatus, DriftInformation.StackDriftStatus, DriftInformation.LastCheckTimestamp]' --output table | grep DRIFTED`;
    const result = execSync(command, { encoding: "utf-8" });
    return result;
  }
}
