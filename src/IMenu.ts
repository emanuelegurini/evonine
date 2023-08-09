export interface IMenu {
  /**
   * Returns an object mapping menu options to their respective functions.
   * @returns An object where each key is an option number and the corresponding value is the function to execute.
   */
  getMenuOptions(): { [key: string]: () => void };

  /**
   * Prints the provided header and options to the console.
   * @param header - The main header/title for the options.
   * @param options - An object containing the list of options to print.
   */
  print(header: string, options: { [key: number]: string }): void;

  /**
   * Starts the menu flow, including selecting a region and displaying available options.
   * @returns A promise that resolves when the process is complete.
   */
  start(): Promise<void>;

  /**
   * Prompts the user for input.
   * @returns A promise that resolves with the user's input.
   */
  getInput(): Promise<string>;

  /**
   * Exports all AWS stack names to a text file.
   */
  exportAllStackNamesToTXT(): void;

  /**
   * Displays all AWS stack names in the console.
   * @returns A promise that resolves when the display process is complete.
   */
  displayAllStackNames(): Promise<void>;

  /**
   * Validates all AWS stacks.
   */
  validateAllStacks(): void;

  /**
   * Displays the names of all drifted AWS stacks in the console.
   */
  displayAllDriftedStacks(): void;

  /**
   * Exports the names of all drifted AWS stacks to a text file.
   */
  exportDriftedStacksToTXT(): void;

  /**
   * Displays the status of all AWS stacks in the console.
   */
  showAllStackStatus(): void;

  /**
   * Exports the status of all AWS stacks to a text file.
   */
  exportStackStatusToTXT(): void;
}
