# API
## RUNING THE APP
```bash
# first of all install nvm a node version manager
OS='macos'
# on macos
if [ $OS -eq 'macos' ]; then
    brew install nvm
    # install a version of node
    nvm install 16.13.1
    # on mac
    mkdir ~/.nvm
    echo 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc
    source ~/.zshrc
elif [ $OS -eq 'linux' ]; then
# on linux
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    echo 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bashrc
    source ~/.bashrc
fi
```