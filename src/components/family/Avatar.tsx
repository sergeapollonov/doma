import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { colors } from "../../theme";
import type { PersonId } from "../../types";

const avatarSources: Record<PersonId, number> = {
  alex: require("../../../assets/alex-avatar.png"),
  maya: require("../../../assets/maya-avatar.png")
};

type AvatarProps = {
  person: PersonId;
  size?: number;
};

export function Avatar({ person, size = 32 }: AvatarProps) {
  return (
    <Image
      source={avatarSources[person]}
      style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
      resizeMode="cover"
    />
  );
}

export function AvatarStack({ small = false }: { small?: boolean }) {
  const size = small ? 26 : 38;
  return (
    <View style={styles.avatarStack}>
      <Avatar person="alex" size={size} />
      <View style={styles.avatarOverlap}>
        <Avatar person="maya" size={size} />
      </View>
    </View>
  );
}

type AvatarGroupProps = {
  participants: PersonId[];
  small?: boolean;
};

export function AvatarGroup({ participants, small = false }: AvatarGroupProps) {
  const size = small ? 26 : 30;
  return (
    <View style={styles.miniAvatarGroup}>
      {participants.map((person, index) => (
        <View key={person} style={index > 0 ? styles.miniAvatarOverlap : undefined}>
          <Avatar person={person} size={size} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.surfaceWarm
  },
  avatarStack: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatarOverlap: {
    marginLeft: -10
  },
  miniAvatarGroup: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 34
  },
  miniAvatarOverlap: {
    marginLeft: -12
  }
});
