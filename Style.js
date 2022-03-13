import { StyleSheet } from 'react-native'

export const style = StyleSheet.create({
    viewWrapper: {
        flex: 1
    },
    viewForm: {
        flex: 2,
        padding: 5
    },
    viewData: {
        flex: 3
    },
    TextInput: {
        padding: 5,
        fontSize: 15,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#CCCCCC',
        marginBottom: 10,
        backgroundColor: '#f5f5f5'
    },
    viewList: {
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#dedede'
    },
    textListNama: {
        flex: 3,
        fontSize: 20,
        fontWeight: 'bold'
    },
    textListEdit: {
        color: 'blue',
        marginRight: 20
    },
    textListDelete: {
        color: 'red'
    }

})