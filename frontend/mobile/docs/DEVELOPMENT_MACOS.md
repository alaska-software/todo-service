# Setting up iOS Development Environment on macOS

This guide provides step-by-step instructions for setting up and running the mobile
application on iOS devices using macOS. It covers the installation of required tools,
project setup, building the app in both debug and release modes,
and deploying to iOS simulators or physical devices.

## Prerequisites

1. Install Xcode from App Store
2. Install Homebrew
3. Install Node.js

```bash
brew install node
```

4. Install Quasar CLI

```bash
npm install -g @quasar/cli
```

5. Install Cordova

```bash
npm install -g cordova
```

6. Enable Xcode command-line tools

```bash
xcode-select --install
```

7. Install deployment tools

```bash
brew install ios-deploy
brew install cocoapods
```

## Frontend Setup

1. Ensure that the Backend is running

```bash
curl http://localhost:9100/todoitems
```

Expected response:

```json
{
    "result": {
        "data": [
            {
                "id": 1,
                "created": "2026-01-01T12:00:00",
                "text": "Sample todo",
                "changed": "2026-01-01T12:00:00",
                "state": "open",
                "priority": "high"
            }
        ],
        "dictionaries": {
            "states": [
                {
                    "id": "open",
                    "name": "Open"
                },
                {
                    "id": "done",
                    "name": "Done"
                }
            ],
            "priorities": [
                {
                    "id": "high",
                    "name": "High"
                },
                {
                    "id": "low",
                    "name": "Low"
                }
            ]
        }
    },
    "error": null
}
```

2. Check out the Frontend from the GitHub repository

```bash
git clone https://github.com/alaska-software/todo-service.git
cd todo-service/frontend/mobile
```

3. Install project dependencies

```bash
npm ci
```

4. Add ios platform

```bash
cd src-cordova
cordova platform add ios
```

5. Check cordova requirements

```bash
cd src-cordova
cordova requirements
```

This command checks if all required tools are properly installed and configured.

## Add iOS simulators

To add iOS simulators for testing the app:

1. Open Xcode
2. Go to **Window** > **Devices and Simulators**
3. Click the **Simulators** tab
4. Click the **+** button in the bottom left corner
5. Select the desired iOS version and device type (e.g., iPhone 14, iPad Pro)
6. Click **Create**

Alternatively, you can list available simulators using:

```bash
xcrun simctl list devices
```

## Build for iOS

### In Debug mode

```bash
cordova build ios --buildFlag="DEVELOPMENT_TEAM=<TeamID>"
```

\<TeamID\> is your Apple Developer Team ID.

### In Release mode

```bash
cordova build ios --buildFlag="DEVELOPMENT_TEAM=<TeamID>" --buildFlag='PACKAGE_TYPE=<packageType>'
```

## Run on an iOS emulator

```bash
cordova run --emulator ios --buildFlag="DEVELOPMENT_TEAM=<TeamID>"
```

## Run on an iOS device

```bash
cordova run --device ios --buildFlag="DEVELOPMENT_TEAM=<TeamID>"
```

## build.json

The `build.json` file is an alternative to the `--buildFlag` option.
It allows you to specify build configurations for iOS without passing them
as command-line arguments each time. Create this file in the `src-cordova` directory:

```json
{
    "ios": {
        "debug": {
            "buildFlag": [
                "DEVELOPMENT_TEAM=<TeamID>"
            ]
        },
        "release": {
            "buildFlag": [
                "DEVELOPMENT_TEAM=<TeamID>",
                "PACKAGE_TYPE=<packageType>"
            ]
        }
    }
}
```

Replace `<TeamID>` with your Apple Developer Team ID and `<packageType>` with your desired package type (e.g.,
`app-store`, `ad-hoc`, `enterprise`, or `development`).

With this file in place, you can run simplified commands:

```bash
cordova build ios --debug
cordova build ios --release
```
