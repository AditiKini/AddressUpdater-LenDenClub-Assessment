import { createContext, useState } from "react"; //createContext is hooks in react.

//create context
//Context Provider: This is a component that provides the context data to its descendants. 
//It uses the React.createContext API to create a context object and wraps its child components 
//with a <Context.Provider> component. The data you want to share is typically passed as a value 
//prop to the provider.

export const DataContext = createContext(null);

const DataProvider = ({children}) => {

    const [account, setAccount] = useState('');
    return(
        // Provider gives access of value.
        <DataContext.Provider value={{
            account,
            setAccount
        }}>
            { children }
        </DataContext.Provider>
    )
}

export default DataProvider;