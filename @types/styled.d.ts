// styled.d.ts
import {Theme} from 'react-native-paper/lib/typescript/types';
import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
