import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export const createViewCardsStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'serif',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.primary,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.accent,
  },
  backButton: {
    padding: 10,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: 40, // Match back button width for centering
  },
  deckTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.accent,
    fontFamily: 'serif',
  },
  cardCount: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
    fontFamily: 'serif',
  },
  cardsList: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  cardItem: {
    marginBottom: 15,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.accent,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'flex-start',
  },
  cardNumber: {
    backgroundColor: COLORS.accent,
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.background,
    fontFamily: 'serif',
  },
  cardTexts: {
    flex: 1,
    marginRight: 10,
  },
  cardSide: {
    marginBottom: 10,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: 4,
    textTransform: 'uppercase',
    fontFamily: 'serif',
  },
  cardText: {
    fontSize: 16,
    color: COLORS.white,
    lineHeight: 22,
    fontFamily: 'serif',
  },
  cardActions: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  editButton: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  deleteButton: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    color: COLORS.gray,
    marginTop: 20,
    fontFamily: 'serif',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 8,
    fontFamily: 'serif',
    textAlign: 'center',
    opacity: 0.7,
  },
});