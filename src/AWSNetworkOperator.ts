import { execSync } from "child_process";
import { IAWSNetworkOperator } from "./IAWSNetworkOperator";

export class AWSNetworkOperator implements IAWSNetworkOperator {
  private statusFilter: string = `CREATE_IN_PROGRESS CREATE_FAILED CREATE_COMPLETE ROLLBACK_IN_PROGRESS ROLLBACK_FAILED ROLLBACK_COMPLETE DELETE_IN_PROGRESS DELETE_FAILED UPDATE_IN_PROGRESS UPDATE_COMPLETE_CLEANUP_IN_PROGRESS UPDATE_COMPLETE UPDATE_FAILED UPDATE_ROLLBACK_IN_PROGRESS UPDATE_ROLLBACK_FAILED UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS UPDATE_ROLLBACK_COMPLETE REVIEW_IN_PROGRESS IMPORT_IN_PROGRESS IMPORT_COMPLETE IMPORT_ROLLBACK_IN_PROGRESS IMPORT_ROLLBACK_FAILED IMPORT_ROLLBACK_COMPLETE`;

  public fetchStackList(region: string): string {
    try {
      const command = `aws cloudformation list-stacks --stack-status-filter ${this.statusFilter} --region ${region} --query 'sort_by(StackSummaries, &StackName)[*].[StackName, StackStatus, DriftInformation.StackDriftStatus, DriftInformation.LastCheckTimestamp]' --output table`;
      const result = execSync(command, { encoding: "utf-8" });
      return result;
    } catch (error: unknown) {
      throw new Error(
        `Failed to fetch stack list for region ${region}: ${error}`
      );
    }
  }

  public detectStackDrift(stackName: string, region: string): string {
    try {
      const command = `aws cloudformation detect-stack-drift --stack-name ${stackName} --region ${region}`;
      const result = execSync(command, { encoding: "utf-8" });
      return result;
    } catch (error: unknown) {
      throw new Error(
        `Failed to detect stack drift for stack ${stackName} in region ${region}: ${error}`
      );
    }
  }

  public fetchAllStackStatus(region: string): string {
    try {
      const command = `aws cloudformation list-stacks --stack-status-filter ${this.statusFilter} --region ${region} --query 'sort_by(StackSummaries, &StackName)[*].[StackName, StackStatus, DriftInformation.StackDriftStatus, DriftInformation.LastCheckTimestamp]' --output table`;
      const result = execSync(command, { encoding: "utf-8" });
      return result;
    } catch (error: unknown) {
      throw new Error(
        `Failed to fetch all stack statuses for region ${region}: ${error}`
      );
    }
  }

  public fetchAllDriftedStacks(region: string): string {
    try {
      const command = `aws cloudformation list-stacks --stack-status-filter ${this.statusFilter} --region ${region} --query 'sort_by(StackSummaries, &StackName)[*].[StackName, StackStatus, DriftInformation.StackDriftStatus, DriftInformation.LastCheckTimestamp]' --output table | grep DRIFTED`;
      const result = execSync(command, { encoding: "utf-8" });
      return result;
    } catch (error: unknown) {
      throw new Error(
        `Failed to fetch all drifted stacks for region ${region}: ${error}`
      );
    }
  }
}
