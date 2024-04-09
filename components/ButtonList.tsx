import {
  Text,
  TouchableOpacity,
  ScrollView,
  type ViewStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/core";
import { COLORS, PALETTE } from "@/primitives/colors";

interface Props {
  items: { text: string; onPress: () => void }[];
  style?: ViewStyle;
}

export function ButtonList({ items, style }: Props) {
  return (
    <ScrollView
      style={{
        ...{
          flex: 1,
          flexDirection: "column",
          width: "100%",
        },
        ...style,
      }}
    >
      {items.map((item, i) => {
        return (
          <TouchableOpacity
            onPress={item.onPress}
            style={{
              backgroundColor: COLORS.contentPrimary,
              height: 60,
              margin: 4,
              borderColor: COLORS.contentSecondary,
              borderWidth: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
            key={i}
          >
            <Text
              style={{
                color: PALETTE.DARKEST,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
