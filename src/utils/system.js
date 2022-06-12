import store from "@/store";

export const getPageTitle = title => {
    const appTitle = store.state.system.title
    if (title) {
        return `${title} - ${appTitle}`
    }
    return appTitle
}