# Prompt Keeper

A desktop app for logging AI prompts used across web-based tools. Designed for creative teams who need to archive prompts for copyright protection.

## Installation

### macOS
1. Download **prompt-keeper-mac** from the [latest build](https://github.com/Jan-Maitland/prompt-keeper/actions)
2. Unzip and drag **Prompt Keeper.app** to your Applications folder
3. On first launch: right-click the app, select **Open**, then click **Open** again to bypass the Gatekeeper warning (this is a one-time step for unsigned apps)

### Windows
1. Download **prompt-keeper-windows** from the [latest build](https://github.com/Jan-Maitland/prompt-keeper/actions)
2. Unzip and run the installer
3. On first launch: if SmartScreen appears, click **More info** then **Run anyway** (one-time step for unsigned apps)

## How to Use

1. **Enter your name or initials** in the Artist field (top-right) — this is remembered between sessions
2. **Select the AI tool** you're using from the dropdown
3. **Navigate to your AI tool** using the URL bar at the top
4. **Type your prompt** in the text area, then either:
   - Press **Return** to log and copy to clipboard
   - Click the **Log & Copy** button
   - Use **Cmd+Return** (Mac) or **Ctrl+Return** (Windows) to insert a new line for multi-line prompts
5. **Paste** (Cmd+V / Ctrl+V) into your AI tool in the browser below
6. Repeat for each prompt — the session counter tracks how many you've logged
7. When finished, click **Export to PDF** to save all session prompts as a single PDF file

## PDF Output

Each exported PDF includes:
- Session date
- Artist name
- A table of all prompts with timestamps and tool names
