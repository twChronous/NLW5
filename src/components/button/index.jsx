import React from 'react';
import { 
    TouchableOpacity, 
    Text 
} from 'react-native';
import styles from './styles';

export default function button({ name, ...rest }) {
    return (
        <TouchableOpacity 
        style={styles.container}
        activeOpacity={0.7}
        {...rest}
        >
            <Text style={styles.text}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}