import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface ITextGroup {
  title: string;
  description: string;
  end?: boolean;
  horizontal?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
}

export default function TextGroup({
  title,
  description,
  end = false,
  horizontal = false,
  containerStyle,
  descriptionStyle,
  titleStyle,
}: ITextGroup) {
  return (
    <View
      style={[
        styles.container,
        end && styles.containerEnd,
        horizontal && styles.horizontal,
        containerStyle,
      ]}
    >
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <Text style={[styles.description, descriptionStyle]}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    alignSelf: 'flex-start',
  },
  containerEnd: {
    alignItems: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  description: {
    fontSize: 14,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    width: '100%',
  },
});
