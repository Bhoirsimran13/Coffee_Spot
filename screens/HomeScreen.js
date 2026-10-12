
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function HomeScreen({ onOpenCamera }) {
  const coffees = [
    {
      name: 'Espresso ☕',
      info: 'Strong coffee made using hot water and ground coffee beans.',
    },
    {
      name: 'Cappuccino 🥛',
      info: 'Espresso combined with steamed milk and milk foam.',
    },
    {
      name: 'Latte ☕',
      info: 'Smooth coffee prepared with espresso and steamed milk.',
    },
    {
      name: 'Americano 🖤',
      info: 'Espresso mixed with hot water.',
    },
    {
      name: 'Cold Coffee 🧊',
      info: 'Chilled coffee prepared with cold milk and ice.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>☕ CoffeeSpot</Text>
      <Text style={styles.subtitle}>
        Explore the world of coffee!
      </Text>

      <Text style={styles.heading}>Coffee Varieties</Text>

      {coffees.map((coffee, index) => (
        <View style={styles.card} key={index}>
          <Text style={styles.cardTitle}>{coffee.name}</Text>
          <Text style={styles.info}>{coffee.info}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={onOpenCamera}
      >
        <Text style={styles.buttonText}>
          📷 Open Camera & GPS
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6F4E37',
    textAlign: 'center',
    marginTop: 35,
  },
  subtitle: {
    textAlign: 'center',
    color: '#795548',
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6F4E37',
    marginVertical: 12,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 7,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6F4E37',
    marginBottom: 6,
  },
  info: {
    color: '#5D4037',
    lineHeight: 21,
  },
  button: {
    backgroundColor: '#6F4E37',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});