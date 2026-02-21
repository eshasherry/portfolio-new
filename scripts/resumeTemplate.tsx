import React from 'react';
import { Document, Page, Text, View, Link } from '@react-pdf/renderer';
import { styles } from './resumeStyles';
import {
  personalInfo,
  experiences,
  education,
  skillCategories,
  certifications,
} from '../src/data/portfolioData';

// ── Helpers ──

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.bulletRow}>
    <Text style={styles.bulletChar}>{'\u2022'}</Text>
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

// ── Sections ──

const Header = () => (
  <View>
    <Text style={styles.headerName}>{personalInfo.name}</Text>
    <Text style={styles.headerContact}>
      {personalInfo.email} | {personalInfo.phone} |{' '}
      <Link src={personalInfo.linkedin} style={styles.headerLink}>
        linkedin.com/in/eshasherry
      </Link>
    </Text>
  </View>
);

const SectionTitle = ({ title }: { title: string }) => (
  <View>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionRule} />
  </View>
);

const ExperienceSection = () => (
  <View>
    <SectionTitle title="Experience" />
    {experiences.map((exp) => (
      <View key={`${exp.company}-${exp.period}`} wrap={false}>
        <View style={styles.entryRow}>
          <Text style={styles.entryCompany}>{exp.company}</Text>
          <Text style={styles.entryPeriod}>{exp.period}</Text>
        </View>
        <View style={styles.entryRow}>
          <Text style={styles.entryRole}>{exp.role}</Text>
          <Text style={styles.entryLocation}>{exp.location}</Text>
        </View>
        {(exp.resumeHighlights ?? exp.highlights).map((h, i) => (
          <Bullet key={i}>{h}</Bullet>
        ))}
      </View>
    ))}
  </View>
);

const EducationSection = () => (
  <View>
    <SectionTitle title="Education" />
    {education.map((edu) => (
      <View key={`${edu.school}-${edu.year}`} wrap={false}>
        <View style={styles.entryRow}>
          <Text style={styles.entryCompany}>{edu.school}</Text>
          <Text style={styles.entryPeriod}>{edu.year}</Text>
        </View>
        <View style={styles.entryRow}>
          <Text style={styles.entryRole}>{edu.degree}</Text>
          <Text style={styles.entryLocation}>{edu.location}</Text>
        </View>
        {edu.coursework && <Bullet>Coursework: {edu.coursework}</Bullet>}
        {edu.capstone && <Bullet>Capstone Project: {edu.capstone}</Bullet>}
      </View>
    ))}
  </View>
);

const SkillsSection = () => (
  <View>
    <Text style={styles.subsectionTitle}>Technical Skills</Text>
    {skillCategories.map((cat) => (
      <View key={cat.name} style={styles.skillRow}>
        <Text style={styles.skillBullet}>{'-'}</Text>
        <Text style={styles.skillList}>
          <Text style={styles.skillCategory}>{cat.name}: </Text>
          {cat.skills.join(', ')}
        </Text>
      </View>
    ))}
  </View>
);

const CertificationsSection = () => (
  <View>
    <Text style={styles.subsectionTitle}>Certifications & Training:</Text>
    {certifications.map((cert) => (
      <View key={cert.name} style={styles.certRow}>
        <Text style={styles.certBullet}>{'-'}</Text>
        <Text style={styles.certList}>
          <Text style={styles.certName}>{cert.name}</Text>
          {cert.issuer ? <Text style={styles.certIssuer}> - {cert.issuer}</Text> : null}
        </Text>
      </View>
    ))}
  </View>
);

// ── Document ──

export const ResumeDocument = () => (
  <Document title={`${personalInfo.name} Resume`} author={personalInfo.name}>
    <Page size="LETTER" style={styles.page}>
      <Header />
      <ExperienceSection />
      <EducationSection />
      <SectionTitle title="Other" />
      <SkillsSection />
      <CertificationsSection />
    </Page>
  </Document>
);
