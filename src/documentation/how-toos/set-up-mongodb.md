# MongoDB Community Edition Setup

This guide will show you how to install MongoDB Community Edition on your macOS system. You can choose between two methods: using **Homebrew** (the recommended package manager for macOS) or **direct download** from the official MongoDB website.

## Prerequisites

- macOS operating system (with administrator access)
- Terminal (command-line interface)

## 1. Install MongoDB Community Edition Using Homebrew

Homebrew is the easiest way to install MongoDB on macOS. If you don’t have Homebrew installed, you can get it from [https://brew.sh/](https://brew.sh/).

### Step 1: Install Homebrew (if not installed)

If you haven’t installed Homebrew yet, run the following command in your terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Step 2: Tap the MongoDB Formula

Once Homebrew is installed, you can tap the official MongoDB formula. This will allow you to install the MongoDB package from Homebrew.

```bash
brew tap mongodb/brew
```

### Step 3: Install MongoDB

Now, you can install MongoDB using Homebrew:

```bash
brew install mongodb-community@6.0
```

This command installs the latest stable version of MongoDB Community Edition.

### Step 4: Start MongoDB

After installation, you can start MongoDB using the following command:

```bash
brew services start mongodb/brew/mongodb-community
```

This will start MongoDB as a background service. If you want to stop MongoDB, run:

```bash
brew services stop mongodb/brew/mongodb-community
```

### Step 5: Verify MongoDB is Running

You can check if MongoDB is running by typing the following command:

```bash
ps aux | grep -v grep | grep mongod
```

Alternatively, you can connect to MongoDB using the MongoDB shell:

```bash
mongosh
```

If successful, you will see the MongoDB shell prompt.

## 2. Install MongoDB Community Edition Using Direct Download

If you prefer not to use Homebrew, you can install MongoDB Community Edition manually by downloading the installer from the official MongoDB website.

### Step 1: Download MongoDB

Go to the official MongoDB download page:
[Download MongoDB Community Edition](https://www.mongodb.com/try/download/community)

1. Select **macOS** as your operating system.
2. Choose the **macOS** version (either `.tgz` or `.pkg`).
3. Click **Download**.

#### Option 1: Install via `.tgz` Archive (manual installation)

If you choose to download the `.tgz` archive file:

1. Extract the `.tgz` file to your preferred directory:

```bash
tar -zxvf mongodb-macos-x86_64-*.tgz
```

Move the MongoDB binaries to a directory in your PATH (e.g., `/usr/local/bin`):

```bash
sudo mv mongodb-macos-x86_64-* /usr/local/mongodb
```

Add MongoDB’s `bin` folder to the PATH in your shell profile (`~/.bash_profile`, `~/.zshrc`, etc.):

```bash
export PATH=/usr/local/mongodb/bin:$PATH
```

Reload your shell profile:

```bash
source ~/.zshrc
```

Now, you can run MongoDB with:

```bash
mongod
```

#### Option 2: Install via `.pkg` Installer (easier installation)

If you download the `.pkg` installer:

1. Run the downloaded `.pkg` file to start the installation process.
2. Follow the prompts to install MongoDB.
3. After installation, MongoDB will be installed in `/usr/local/` and you can run the `mongod` command directly.

### Step 2: Start MongoDB

Once installed, you can start MongoDB using:

```bash
mongod --config /usr/local/etc/mongod.conf
```

### Step 3: Verify MongoDB is Running

To verify if MongoDB is running, use the `mongosh` shell or run:

```bash
ps aux | grep -v grep | grep mongod
```

If MongoDB is running, you'll see output confirming the process is active.

## 3. Connect to MongoDB

Once MongoDB is running, you can connect to it using the **MongoDB Shell**:

```bash
mongosh
```

This will connect you to the local MongoDB instance and open an interactive shell.

## 4. Stopping MongoDB

### Using Homebrew

If MongoDB was started using Homebrew, you can stop it with:

```bash
brew services stop mongodb/brew/mongodb-community
```

### Using Direct Installation

If you started MongoDB manually using `mongod`, you can stop it by pressing `CTRL+C` in the terminal where the `mongod` process is running. Alternatively, you can kill the MongoDB process with:

```bash
pkill mongod
```

## 5. Uninstalling MongoDB

### Using Homebrew Uninstall

If you installed MongoDB via Homebrew and want to uninstall it:

```bash
brew uninstall mongodb/brew/mongodb-community
```

### Using Direct Installation Delete

If you installed MongoDB manually, you can simply delete the MongoDB files and remove the binary from your system.

1. Delete the MongoDB folder:

```bash
sudo rm -rf /usr/local/mongodb
```

Remove the MongoDB `bin` directory from your PATH in the shell profile (`~/.bash_profile`, `~/.zshrc`, etc.).

## Conclusion

You now have two methods to install MongoDB Community Edition on your macOS machine: using **Homebrew** or **direct download**. Choose the method that best suits your needs. If you prefer a simpler installation with automatic updates, using **Homebrew** is recommended.
