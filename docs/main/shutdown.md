# Shutting Down

When a plugin is shut down, it is important to clean up resources allocated during its lifetime to prevent memory leaks. This includes unregistering event listeners, closing open connections, and releasing any other allocated resources.

The following tasks should be completed in the `shutdown` hook:

1. **Close Open Windows and Popups**
   - Close any windows, tabs, or popups that were opened by the plugin.
2. **Global Object and UI Cleanup**
   - Remove any DOM elements, including styles, scripts, and locales that were added by the plugin.
   - Remove references to any windows or objects within it, including event listeners and any references to DOM elements.
   - Remove any attributes or properties that were added to the main window or the Zotero object.
3. **Connection and Task Cleanup**
   - Close any open connections, such as database connections or network connections.
   - Stop any running tasks, such as timers or web workers.

For Zotero-provided plugin APIs, explicit shutdown tasks are not required, as these APIs will automatically handle resource cleanup when the plugin is unloaded.
