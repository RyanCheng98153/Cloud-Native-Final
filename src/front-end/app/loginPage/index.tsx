import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./style";

import { Router, Link } from "expo-router";

export default function index() {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>GroupUp!</Text>
      <Text style={styles.subtitle}>Welcome back to GroupUp</Text>
      <Text style={styles.subtitle}>loginPage</Text>
      <Link href="/">Home</Link>
    </View>
  );
}
