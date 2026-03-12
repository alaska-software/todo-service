# Setting up Android Development Environment on Windows

This guide provides step-by-step instructions for setting up an Android development environment on Windows
to build and run the Quasar mobile application. It covers installing required tools,
configuring environment variables, setting up Android Studio with the necessary SDK components,
and running the app on Android emulators or physical devices.

## System Requirements

- **Operating System:** Windows 10 (64-bit) or newer
- **RAM:** Minimum 8 GB (16 GB recommended for running emulators)
- **Disk Space:** At least 10 GB free space for Android SDK and tools
- **Processor:** Intel/AMD processor with virtualization support (VT-x/AMD-V)
- **BIOS:** Virtualization must be enabled for Android Emulator

## Set up the development environment

### 1. Install prerequisites

1. [OpenJDK 17.0.0.1](https://jdk.java.net/java-se-ri/17-MR1)
   ```bash
   java -version
   # Expected: openjdk version "17.0.0.1"
   ```

2. [Gradle 9.2.1](https://gradle.org/)
   ```bash
   gradle -v
   # Expected: Gradle 9.2.1
   ```

3. [Node.js 24.8.0](https://nodejs.org/en)
   ```bash
   node -v
   # Expected: v24.8.0
   ```

### 2. Install required tools

#### 1. Quasar CLI

Install [Quasar CLI](https://quasar.dev/introduction-to-quasar):
```bash
npm install -g @quasar/cli
```

Verify Quasar installation:
```bash
quasar -v
```

#### 2. Cordova CLI

Install [Cordova CLI](https://cordova.apache.org/docs/en/latest/):
```bash
npm install -g cordova
```

Verify Cordova installation:
```bash
cordova -v
```

#### 3. Android Studio

Install [Android Studio](https://developer.android.com/studio).

After installation, launch Android Studio for the first time. The setup wizard will guide you through:
- Installing the latest SDK components
- Setting up the Android Virtual Device (AVD)
- Configuring IDE settings

Complete the initial setup wizard before proceeding to the next steps.

### 3. Set environment variables

Set environment variables:

| Variable           | Description                               | Example Value                                 |
|--------------------|-------------------------------------------|-----------------------------------------------|
| `JAVA_HOME`        | Path to Java Development Kit installation | `C:\Program Files\Java\jdk-17.0.0.1`          |
| `GRADLE_HOME`      | Path to Gradle installation directory     | `C:\Gradle\gradle-9.2.1`                      |
| `ANDROID_HOME`     | Android SDK location for Cordova          | `C:\Users\username\AppData\Local\Android\Sdk` |
| `ANDROID_SDK_ROOT` | Android SDK location for Quasar           | `C:\Users\username\AppData\Local\Android\Sdk` |

The variable `PATH` should include:

- %GRADLE_HOME%\bin
- %JAVA_HOME%\bin
- %ANDROID_SDK_ROOT%\platform-tools
- %ANDROID_SDK_ROOT%\emulator
- %ANDROID_SDK_ROOT%\cmdline-tools\latest\bin

### 4. Set up Android Studio (SDK)

From the Android Studio welcome screen, click on **More Actions** and select **SDK Manager**.

![Welcome to Android Studio - SDK](docs/as-welcome-sdk.jpg)

#### SDK Platforms

In the **SDK Manager**, go to the **SDK Platforms** tab and install the required Android SDK platform versions:

- Android SDK Platform 36
- Sources for Android 36

![SDK Platforms](docs/as-sdk-platforms.jpg)

#### SDK Tools

In the **SDK Manager**, go to the **SDK Tools** tab and install the required tools and build components:

- Android SDK Build-Tools 36.0.0
- Android SDK Command-line Tools (latest) 20.0
- Android SDK Platform-Tools 37.0.0
- Android Emulator 36.4.9

![SDK Build-Tools](docs/as-sdk-tools-build-tools.jpg)
![SDK Tools - Other Components](docs/as-sdk-tools-others.jpg)

### 5. Add Android emulators

Create virtual devices to test your application on different Android configurations.
From the Android Studio welcome screen, click on **More Actions** and select **Virtual Device Manager**.

![Welcome to Android Studio - Virtual Device Manager](docs/as-welcome-vdm.jpg)

![Virtual Device Manager](docs/as-vdm.jpg)

1. Click **Create Virtual Device** [+]
2. Select a device definition (e.g., Pixel 9, Pixel 7)
3. Click **Next**
4. Select a system image (Android 16.0 / API Level 36.0)
    - Download the system image if not already installed
5. Click **Finish**

To verify the emulator is available:

```bash
emulator -list-avds
```

This command should list the emulator names you created (e.g., `Pixel_9_API_36`). If no emulators are listed, return to the Device Manager and create at least one virtual device.

## Project Setup

The following steps demonstrate setting up a Quasar/Cordova Android project. Adjust paths and repository URLs according to your specific project.

1. Check out or update the project from the GitHub repository

```bash
git clone https://github.com/alaska-software/todo-service.git
cd todo-service/frontend/mobile
```

2. Install Project Dependencies

```bash
npm ci
```

3. Add Android platform

```bash
cd src-cordova
npm ci
cordova platform add android
```

4. Verify Cordova requirements

```bash
cordova requirements android
```

This command checks if all required tools (Java, Gradle, Android SDK) are properly installed and configured. All requirements should show as installed/available.

5. Configure the Backend URL in the Frontend

Edit `src/boot/axios.js` to point to the correct backend:

- `http://localhost:9100/` — local development
- `http://10.0.2.2:9100/` — Android emulator accessing the host machine


## Run on Android Emulator

```bash
# Start on default emulator
quasar dev -m cordova -T android

# Or specify emulator name
quasar dev -m cordova -T android -e <emulator_name>

# Or use npm script
npm run dev-android16
```

**Note:** Check your project's `package.json` for available npm scripts with `npm run`.

## Build for Android device

```bash
# Build for Android (debug)
quasar build -m cordova -T android --debug

# Or use npm script
npm run build-android-debug
```

## Install on Android device

```bash
npm run adb:install
```

## Physical Device Setup

To run the app on a physical Android device:

### 1. Enable Developer Options

1. Open **Settings** on your Android device
2. Navigate to **About phone**
3. Tap **Build number** 7 times until you see "You are now a developer!"

### 2. Enable USB Debugging

1. Go back to **Settings**
2. Navigate to **System** > **Developer options**
3. Enable **USB debugging**
4. (Optional) Enable **Install via USB** for easier app installation

### 3. Connect and Authorize

1. Connect your device to your computer via USB cable
2. On your device, authorize the computer when prompted
3. Select **Always allow from this computer** and tap **OK**

### 4. Verify Connection

Check that your device is recognized:

```bash
adb devices
```

## Chrome DevTools Debugging

1. Run the app on your device or emulator
2. Open Chrome browser on your computer
3. Navigate to `chrome://inspect`
4. Your app should appear under **Remote Target**
5. Click **inspect** to open DevTools
6. Use Console, Network, and Elements tabs to debug
