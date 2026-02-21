import { StyleSheet } from '@react-pdf/renderer';

const colors = {
  black: '#000000',
  darkGray: '#333333',
  mediumGray: '#555555',
  rule: '#000000',
  link: '#0563C1',
};

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 48,
    color: colors.black,
  },

  // ── Header ──
  headerName: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  headerContact: {
    fontSize: 10,
    color: colors.darkGray,
    marginBottom: 16,
  },
  headerLink: {
    color: colors.link,
    textDecoration: 'none',
  },

  // ── Section ──
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginTop: 12,
    marginBottom: 2,
  },
  sectionRule: {
    borderBottomWidth: 1,
    borderBottomColor: colors.rule,
    marginBottom: 8,
  },

  // ── Experience / Education entry ──
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  entryCompany: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },
  entryPeriod: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },
  entryRole: {
    fontSize: 10,
    color: colors.darkGray,
  },
  entryLocation: {
    fontSize: 10,
    color: colors.darkGray,
    textAlign: 'right',
  },

  // ── Bullets ──
  bulletRow: {
    flexDirection: 'row',
    marginLeft: 12,
    marginTop: 2,
    paddingRight: 12,
  },
  bulletChar: {
    width: 12,
    fontSize: 10,
    color: colors.mediumGray,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.4,
  },

  // ── Skills ──
  skillRow: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 2,
  },
  skillBullet: {
    width: 12,
    fontSize: 10,
    color: colors.mediumGray,
  },
  skillCategory: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
  },
  skillList: {
    fontSize: 10,
  },

  // ── Certifications ──
  certRow: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 2,
  },
  certBullet: {
    width: 12,
    fontSize: 10,
    color: colors.mediumGray,
  },
  certName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
  },
  certIssuer: {
    fontSize: 10,
  },
  certList: {
    fontSize: 10,
  },

  // ── Subsection heading (e.g. "Technical Skills", "Certifications") ──
  subsectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginTop: 8,
    marginBottom: 2,
  },
});
