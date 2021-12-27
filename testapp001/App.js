import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStickyNote, faFolderPlus, faInfo, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import S1 from "./components/S1"
import S2 from "./components/S2"
import S3 from "./components/S3"
import S4 from "./components/S4"
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => <FontAwesomeIcon icon={faPencilAlt} size={50} style={{alignSelf: "center", justifyContent: "center"}}/>}
      />
      <DrawerItem
        label="notatki"
        icon={() => <FontAwesomeIcon icon={faStickyNote} />}
        onPress={() => props.navigation.navigate("notatki")}
      />
      <DrawerItem
        label="dodaj notatkę"
        icon={() => <FontAwesomeIcon icon={faFolderPlus} />}
        onPress={() => props.navigation.navigate("dodaj notatkę")}
      />
      <DrawerItem
        label="dodaj kategorię"
        icon={() => <FontAwesomeIcon icon={faFolderPlus} style={{ color: "blue" }} />}
        onPress={() => props.navigation.navigate("dodaj kategorię")}
      />
      <DrawerItem
        label="info"
        icon={() => <FontAwesomeIcon icon={faInfo} />}
        onPress={() => alert("notatnik, ver. 2.0. twórca: Michał Cembrowski")}
      />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>

        <Drawer.Screen name="notatki" component={S1} />
        <Drawer.Screen name="dodaj notatkę" component={S2} />
        <Drawer.Screen name="dodaj kategorię" component={S3} />
        <Drawer.Screen name="edycja" component={S4} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
