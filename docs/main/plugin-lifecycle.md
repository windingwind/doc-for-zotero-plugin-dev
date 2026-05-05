# Plugin Lifecycle

Every Zotero plugin follows a lifecycle, from installation to uninstallation. During this cycle, the plugin triggers a series of "hooks"—points in the plugin's execution where certain actions can be taken.

| Hook                 | Triggered when...                                                          | Description                                                                                        |
| -------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `install`            | The plugin is installed or updated                                         | Set up initial configurations. This hook is only for setup tasks and the plugin isn't running yet. |
| `startup`            | The plugin is being loaded                                                 | Initialize everything needed for the plugin to function.                                           |
| `shutdown`           | The plugin is being unloaded                                               | Clean up resources before the plugin stops running.                                                |
| `uninstall`          | The plugin is being uninstalled or replaced by a newer installation        | Perform cleanup for uninstallation.                                                                |
| `onMainWindowLoad`   | The main Zotero window opens. Can happen multiple times during a session.  | Initialize UI changes for the main window.                                                         |
| `onMainWindowUnload` | The main Zotero window closes. Can happen multiple times during a session. | Remove any window-specific changes.                                                                |

The figure below illustrates the plugin lifecycle and the order in which the hooks are called.
The figure below shows the lifecycle of a plugin and how the hooks are called.

```mermaid
flowchart LR
    User((User))
    Update((Plugin Update))

    subgraph UserActions[" "]
        direction TB
        Install(["Install Plugin"])
        Enable(["Enable Plugin"])
        Disable(["Disable Plugin"])
        Uninstall(["Uninstall Plugin"])
        Install --> Enable
        Uninstall --> Disable
    end

    subgraph PluginHooks["plugin lifecycle hooks"]
        direction TB
        installHook["install()"]
        startupHook["startup()"]
        shutdownHook["shutdown()"]
        uninstallHook["uninstall()"]
    end

    StartupLabel(["Zotero Startup"])
    LoadMain["Load Main Window"]
    LoadPlugins["Load Plugins"]
    Ready(("main loop"))
    OpenWin["Open Main Window"]
    CloseWin["Close Main Window"]
    ShutdownLabel(["Zotero Shutdown"])
    UnloadMain["Unload Main Window"]
    UnloadPlugins["Unload Plugins"]
    ExitLabel(["Zotero Exit"])

    StartupLabel --> LoadMain --> LoadPlugins --> Ready
    Ready --> ShutdownLabel --> UnloadMain --> UnloadPlugins --> ExitLabel

    Ready -.-> OpenWin
    OpenWin -.-> CloseWin
    CloseWin -.-> Ready

    subgraph WindowHooks["window hooks"]
        direction TB
        onLoad["onMainWindowLoad()"]
        onUnload["onMainWindowUnload()"]
    end

    User --> Install
    User --> Enable
    User --> Disable
    User --> Uninstall

    Update --> Install
    Update --> Uninstall

    Install -.-> installHook
    Enable -.-> startupHook
    Disable -.-> shutdownHook
    Uninstall -.-> uninstallHook

    LoadPlugins -.-> startupHook
    UnloadPlugins -.-> shutdownHook

    OpenWin -.-> onLoad
    CloseWin -.-> onUnload
    UnloadMain -.-> onUnload

    classDef external fill:#f0f0f0,stroke:#999,color:#555,font-style:italic
    classDef actor fill:transparent,stroke:transparent,color:#333
    classDef zoteroStep fill:#3a5fc4,color:#fff,stroke:#3a5fc4
    classDef ready fill:#888,color:#fff,stroke:#666
    classDef hook fill:transparent,stroke:#3aa860,color:#3aa860
    classDef windowHook fill:transparent,stroke:#e69143,color:#e69143

    class installHook,startupHook,shutdownHook,uninstallHook hook
    class onLoad,onUnload windowHook
    class LoadMain,LoadPlugins,OpenWin,CloseWin,UnloadMain,UnloadPlugins zoteroStep
    class Ready ready
    class Install,Enable,Disable,Uninstall,StartupLabel,ShutdownLabel,ExitLabel external
    class User,Update actor

    style UserActions fill:transparent,stroke:transparent
    style PluginHooks fill:transparent,stroke:#3aa860,stroke-dasharray:5 5,color:#3aa860
    style WindowHooks fill:transparent,stroke:#e69143,stroke-dasharray:5 5,color:#e69143

    %% plugin-hook (dashed green) edges: Install/Enable/Disable/Uninstall hooks + Load/Unload Plugins hooks
    linkStyle 18,19,20,21,22,23 stroke:#3aa860,stroke-dasharray:5 5
    %% window-hook (dashed orange) edges
    linkStyle 24,25,26 stroke:#e69143,stroke-dasharray:5 5
```

> 💡 Try this out!
>
> Add the following line to the `bootstrap.js` file's `startup()` function of the example plugin, then apply the changes and restart Zotero with debug output enabled.
>
> ```javascript
> Zotero.debug("Hello, World! The plugin is loaded.");
> ```
>
> Check the debug output to see if the message is printed when the plugin is loaded.
>
> Disable and then enable the plugin in the _Plugins Manager_ to see if the message is printed again.
