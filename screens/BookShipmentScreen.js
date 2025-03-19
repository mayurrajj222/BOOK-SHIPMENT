// screens/BookShipmentScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const BookShipmentScreen = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [courier, setCourier] = useState(null);
  const [price, setPrice] = useState(0);
  const [couriers, setCouriers] = useState([
    { label: 'Delhivery', value: 'delhivery' },
    { label: 'DTDC', value: 'dtdc' },
    { label: 'Bluedart', value: 'bluedart' },
  ]);

  useEffect(() => {
    if (pickupAddress && deliveryAddress && courier) {
      fetchShippingRates();
    }
  }, [pickupAddress, deliveryAddress, courier]);

  const fetchShippingRates = async () => {
    try {
      const response = await axios.get(`https://your-api-url.com/shipping-rate`, {
        params: {
          pickup: pickupAddress,
          delivery: deliveryAddress,
          courier: courier,
        }
      });
      setPrice(response.data.rate);
    } catch (error) {
      console.error(error);
      setPrice(0);
    }
  };

  const handleBookShipment = () => {
    // Logic for booking the shipment and processing payment can be added here
    alert(`Shipment booked! Total Price: $${price}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book a Shipment</Text>
      <TextInput
        style={styles.input}
        placeholder="Pickup Address"
        value={pickupAddress}
        onChangeText={setPickupAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Delivery Address"
        value={deliveryAddress}
        onChangeText={setDeliveryAddress}
      />
      <RNPickerSelect
        onValueChange={(value) => setCourier(value)}
        items={couriers}
        placeholder={{ label: 'Select a Courier', value: null }}
        style={pickerSelectStyles}
      />
      <Text style={styles.price}>Estimated Price: ${price}</Text>
      <Button title="Book Shipment" onPress={handleBookShipment} disabled={!price} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  price: {
    fontSize: 18,
    marginVertical: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default BookShipmentScreen;