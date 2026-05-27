import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import Colors from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const featureData = [
  {
    id: "1",
    iconName: "eye",
    label: "Scan eye",
    description: "Start a scan",
  },
  {
    id: "2",
    iconName: "book",
    label: "Learn more",
    description: "Understand cataract",
  },
  {
    id: "3",
    iconName: "location-sharp",
    label: "Find clinics",
    description: "Search Nearby",
  },
  {
    id: "4",
    iconName: "person",
    label: "Profile",
    description: "Your info",
  },
];

const ActionCard = () => {
  const navigation = useNavigation();
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <View>
      <FlatList
        data={featureData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const isSelected = selectedCard === item.id;
          return (
            <Pressable
              onPress={() => {
                setSelectedCard(item.id);
                if (item.label === "Scan eye") {
                  navigation.navigate("Camera");
                } else if (item.label === "Learn more") {
                  navigation.navigate("LearnMore");
                } else if (item.label === "Find clinics") {
                  navigation.navigate("FindNearByClinics");
                } else if (item.label === "Profile") {
                  navigation.navigate("Profile");
                }
              }}
              style={({ pressed }) => [
                styles.foodCard,
                pressed && styles.foodCardItemsPressed,
              ]}
            >
              <View
                style={[
                  styles.cardContainer,
                  isSelected && styles.cardContainerSelected,
                ]}
              >
                <Ionicons
                  name={item.iconName}
                  size={35}
                  color={isSelected ? Colors.primary300 : Colors.accent100}
                />
                <Text
                  style={[
                    styles.cardLabel,
                    isSelected && styles.cardLabelSelected,
                  ]}
                >
                  {item.label}
                </Text>
                <Text
                  style={[
                    styles.cardDescription,
                    isSelected && styles.cardDescriptionSelected,
                  ]}
                >
                  {item.description}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default ActionCard;

const styles = StyleSheet.create({
  row: {
    justifyContent: "center",
  },
  foodCard: {
    flex: 1,
    maxWidth: "50%",
    margin: 5,
  },
  foodCardItemsPressed: {
    opacity: 0.7,
  },
  cardContainerSelected: {
    backgroundColor: Colors.accent100,
  },
  cardLabelSelected: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    color: Colors.primary300,
  },
  cardDescriptionSelected: {
    fontFamily: "Montserrat-Regular",
    color: Colors.primary300,
    fontSize: 10,
    textAlign: "center",
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary600,
    padding: 20,
    borderRadius: 10,
  },
  cardLabel: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    color: Colors.accent100,
  },
  cardDescription: {
    fontFamily: "Montserrat-Regular",
    color: Colors.accent100,
    fontSize: 10,
    textAlign: "center",
  },
});
