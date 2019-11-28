const handleUpload = (req, res) => {
    res.json({
        "name": "App",
        "children": [{ "name": "NotificationPanel" }, {
            "name": "Header",
            "children": [{ "name": "HeaderLogo" }, { "name": "HeaderSearchBar" }, { "name": "HeaderSearchBarResultList" }, { "name": "HeaderSearchBarResultListItem" }, { "name": "HeaderSearchBarResultSection" }, { "name": "HeaderNotifications" }, { "name": "HeaderProfile" }, { "name": "HeaderProfileAvatar" }, { "name": "HeaderProfileList" }, { "name": "HeaderProfileListItem" }]
        }, { "name": "Footer" }, { "name": "Workspace" }, { "name": "WindowModal" }, {
            "name": "MenuPanel",
            "children": [{ "name": "MenuPanelToggle" }, { "name": "MenuPanelMessages" }, { "name": "MenuPanelList" }, { "name": "MenuPanelListItem" }, { "name": "MenuPanelUserList" }, { "name": "MenuPanelUserListItem" }, { "name": "MenuPanelAppMarket" }, { "name": "MenuPanelAppMarketList" }, { "name": "MenuPanelAppMarketListItem" }]
        }, { "name": "MessagePanel" }]
    });
}

module.exports = {
    handleUpload: handleUpload
}