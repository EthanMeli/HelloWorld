import { ScrollView } from 'react-native'
import styles from '../../assets/styles/profile.styles';
import ProfileHeader from '../../components/ProfileHeader';
import LogoutButton from '../../components/LogoutButton';
import UserDashboard from '../../components/UserDashboard';

export default function Profile() {

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileHeader />
      <UserDashboard />
      <LogoutButton />
    </ScrollView>
  )
}