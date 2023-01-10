import { Provider } from "react-redux"
import { Outlet } from "react-router-dom"
import { store } from "../../store"

export const MainLayout = () => {
    return (
        <Provider store={store}>
            <MainLayoutRender/>
        </Provider>
    )
}

const MainLayoutRender = () => {
    return (
        <div>
            Main Layout 
            <Outlet/>
        </div>
    )
}