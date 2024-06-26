import React,{useContext, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Button,Text } from 'react-native-paper';
import { TokenContext } from '../tokenContext';
import { ToastContext } from '../toastContext';



function HomePage({navigation}) {
    const {user} = useContext(TokenContext)
	const { showError, showSuccess } = useContext(ToastContext)




    
    return (

		<View style={styles.container}>
			<Text>hello {user}!</Text>
			<Text style={styles.title}>Home</Text>
			<Button
				icon="camera" mode="contained"

				onPress={() => navigation.navigate('NewMovingRequestScreen')}
			>New Moving Request</Button>

	
		</View>
    );
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
       display: 'flex',
    //    height: '100%',
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default HomePage;