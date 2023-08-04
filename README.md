<div align="center"> <a href="#">
    <img
      src="https://github.com/EmanueleGurini/evonine/blob/main/images/logo_evonine.png"
      width="650"
      height="auto"
    />
  </a>
</div>

# EVONINE - AWS Drift Detector

EVONINE is an advanced AWS Drift Detector

Features:

- **Log all Stack Names in Selected AWS Region:** EVONINE will log the names of all the stacks present in the AWS region you have selected within your account. This feature helps you keep track of the stack inventory and changes specific to that region.

- **Check all Stacks in Selected AWS Region:** EVONINE will perform regular checks on all the stacks within the chosen AWS region to detect any configuration drift. This continuous monitoring ensures that you are promptly alerted whenever a drift is detected in that specific region.

- **Log all Drifted Stacks in Selected AWS Region:** Whenever EVONINE detects a configuration drift in any of the stacks within the chosen AWS region, it will log the details of the drifted stack in that region. This log provides insights into the specific changes that occurred and when they happened within that region.

- **Log Table with all Stack Status in Selected AWS Region:** EVONINE will maintain a comprehensive table that includes the status of all the AWS stacks in the chosen region. This table serves as a reference, enabling you to quickly identify and address any issues that may arise within that region.

- **Print all Stack Names in Selected AWS Region to a TXT File:** You can generate a TXT file containing the list of all the stack names captured by EVONINE in the chosen AWS region. This file can be used for documentation or further analysis specific to that region.

- **Print all Drifted Stacks in Selected AWS Region to a TXT File:** EVONINE allows you to generate a separate TXT file that contains the details of all the drifted stacks within the chosen AWS region. This file helps you focus on the specific instances that require attention, streamlining your efforts to maintain a stable AWS environment within that region.

With these features, EVONINE provides a region-specific solution to monitor, track, and address configuration drift in your AWS infrastructure, enhancing the overall security and stability of your environment in the selected region.

## Install

Download the repository and execute the following command:

```bash
npm install
```

## Quick Start

To run EVONINE you need two things:

1. Copy the temporary credential from your AWS Account, and paste them into your terminal.
2. compile the TS code;

### Step 1:

- Copy the temporary credentials from you AWS Account.

![Step 1](https://github.com/EmanueleGurini/evonine/blob/main/images/step_1.png)

- Paste them into your terminal.

![Step 2](https://github.com/EmanueleGurini/evonine/blob/main/images/step_2.png)

### Step 2:

Type the following commands:

```bash
cd src
tsc main.ts
node main
```

![Step 3](https://github.com/EmanueleGurini/evonine/blob/main/images/step_3.jpeg)

## License

MIT
