import { StyleProp, ViewStyle } from "react-native";

export interface SvgIconProps {
    color: string;  
    style?: StyleProp<ViewStyle>;
    onPress?: () => void; 
}
