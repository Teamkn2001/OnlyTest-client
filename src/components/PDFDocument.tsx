import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Logo from "@/assets/mountains-background.jpg";
import UniversityLogo from "@/assets/cambridge.png";

const styles = StyleSheet.create({
  page: {
    position: "relative",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    fontFamily: "Helvetica",
  },
  waterMark: {
    position: "absolute",
    top: "35%",
    left: "20%",
    opacity: 0.15,
    width: "80%",
    // backgroundColor: "red"
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#1f2937",
    fontWeight: "bold",
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: "red",
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    color: "#374151",
  },
  tableLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: "#1f2937",
    fontWeight: "bold",
    textAlign: "center",
  },
  table: {
    width: "100%",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "20%",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000000",
    borderStyle: "solid",
  },
  tableCol: {
    width: "20%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000000",
    borderStyle: "solid",
  },
  tableCellHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "Helvetica-Bold",
  },
  tableCell: {
    fontSize: 12,
    color: "#000000",
    fontFamily: "Helvetica",
  },
  image: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  
});

interface PDFDocumentProps {
  title: string;
  data: Array<{
    name: string;
    email: string;
    role: string;
    status: string;
    phone: string;
  }>;
}

const PDFDocument: React.FC<PDFDocumentProps> = ({ title, data }) => (
  <Document>
    <Page size="A4" style={styles.page}>

      <View style={styles.waterMark}>
        <Image style={{width: "75%", objectFit: "contain", height: "auto"}} src={UniversityLogo} />
      </View>

      <Text style={styles.header}>{title}</Text>

      <View style={styles.section}>
        <Text style={styles.text}>
          Generated on: {new Date().toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.image}>
        <Image /* style={styles.image} */ src={Logo} />
      </View>

      <View style={styles.tableLabel}>
        <Text style={styles.text}>
          This document contains a list of users with their details.
        </Text>
      </View>
      {/* Table */}
      <View style={styles.table}>
        {/* Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Name</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Email</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Role</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Status</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Phone</Text>
          </View>
        </View>

        {/* Data Rows */}
        {data.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.name || "N/A"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.email || "N/A"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.role || "N/A"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.status || "N/A"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.phone || "N/A"}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Debug: Show data being passed */}
      <View style={styles.section}>
        <Text style={styles.text}>Debug - Data count: {data.length}</Text>
        <Text style={styles.text}>First item: {data[0]?.name}</Text>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
