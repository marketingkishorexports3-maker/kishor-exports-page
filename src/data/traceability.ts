export const SUPPLIERS = [
  {
    id: "A",
    name: "Raw Material Creation",
    stage: "raw_material",
    stage_label: "Raw Material Creation",
    address: "",
    certifications: [],
    sub_suppliers: [
      {
        group: "Main Fabric",
        items: [
          { id: "A1", sub_label: "", name: "S.S.V. Textiles Exim Pvt. Ltd.", description: "", address: "S.F.No.416/6, Iyappa Nagar, Thanneerpandal, Peelamedu, Coimbatore, 641004 Tamil Nadu, India" },
        ],
      },
      {
        group: "Lining Fabric",
        items: [
          { id: "A2", sub_label: "", name: "Balaji Textile Mills", description: "", address: "459, Haveli Haider Kuli, New Delhi Central Delhi, DELHI, 110006, Delhi, India" },
        ],
      },
    ],
  },
  {
    id: "B",
    name: "Yarn Processing",
    stage: "yarn_processing",
    stage_label: "Yarn Processing",
    address: "",
    certifications: [],
    sub_suppliers: [
      {
        group: "Main Fabric",
        items: [
          { id: "B1", sub_label: "", name: "Lakshmi Textile Mills", description: "", address: "10/37, 512, Periya Vadugapatti, Manmangalam Karur, 639006 Tamil Nadu, India" },
        ],
      },
      {
        group: "Lining Fabric",
        items: [
          { id: "B2", sub_label: "", name: "Balaji Textile Mills", description: "", address: "459, Haveli Haider Kuli, New Delhi Central Delhi, DELHI, 110006, Delhi, India" },
        ],
      },
    ],
  },
  {
    id: "C",
    name: "Fabric Processing",
    stage: "fabric_processing",
    stage_label: "Fabric Processing",
    address: "",
    certifications: [],
    sub_suppliers: [
      {
        group: "Main Fabric",
        items: [
          { id: "C1", sub_label: "Weaving Mill", name: "S.S.V. Textiles Exim Pvt. Ltd.", description: "", address: "S.F.No.416/6, Iyappa Nagar, Thanneerpandal, Peelamedu, Coimbatore, 641004 Tamil Nadu, India", certificate_url: "/certificates/ssv_textiles_exim.pdf" },
          { id: "C2", sub_label: "Dyeing Mill", name: "Jain Cord Industries Pvt. Ltd.", description: "Vertically integrated company committed to excellence in sustainable manufacturing and processing of premium fabrics.", address: "Gurugram, Haryana, India", certificate_url: "/certificates/jain_cord_industries.pdf" },
        ],
      },
      {
        group: "Lining Fabric",
        items: [
          { id: "C3", sub_label: "Weaving Mill", name: "Balaji Textile Mills", description: "", address: "459, Haveli Haider Kuli, New Delhi Central Delhi, DELHI, 110006, Delhi, India", certificate_url: "/certificates/balaji_textile_mills.pdf" },
          { id: "C4", sub_label: "Dyeing Mill", name: "Shree Jagdamba Knits Pvt. Ltd.", description: "", address: "Greater Noida, Uttar Pradesh, India", certificate_url: "/certificates/shree_jagdamba_knits_lining.pdf" },
        ],
      },
    ],
  },
  {
    id: "D",
    name: "Trims",
    stage: "trims",
    stage_label: "Trims",
    address: "",
    certifications: [],
    sub_suppliers: [
      {
        group: null,
        items: [
          { id: "D1", sub_label: "Labelling", name: "Byways Labels", description: "Providing branding and packing solutions to the apparel industry for over 60 years.", address: "Gurugram, Haryana, India" },
          { id: "D2", sub_label: "Zipper", name: "YKK", description: "The world's largest zipper manufacturer is trusted worldwide for impeccable production standards.", address: "Gurugram, Haryana, India" },
          { id: "D3", sub_label: "Latex", name: "Signature Foam Pvt. Ltd.", description: "", address: "Velliyamattom, Kerala, India", certificate_url: "/certificates/signature_foam.pdf" },
        ],
      },
    ],
  },
  {
    id: "E",
    name: "Vibhuti Packers",
    stage: "packaging",
    stage_label: "Packaging",
    address: "Shop No. 350, Sector-1, T.P. Nagar, Agra, Uttar Pradesh, India",
    certifications: [],
    sub_label: "Box",
  },
  {
    id: "F",
    name: "Kishor Exports",
    stage: "cmt",
    stage_label: "Cut Make Trim (CMT)",
    address: "Plot No. E,F,G Kulhi Industrial Area Ormanjhi, Ranchi-835219 (Jharkhand), India",
    certifications: ["SMETA", "Sedex"],
    certificate_url: "/certificates/seller_of_sertified_products.pdf",
    sub_label: null,
  },
  {
    id: "G",
    name: "Kishor Exports · Global Distribution",
    stage: "brand_retail",
    stage_label: "Retailer",
    address: "Shop No. 350, Sector-1, T.P. Nagar, Agra, Uttar Pradesh, India",
    certifications: [],
    sub_label: "Brand",
  },
];

export const MAP_MARKERS = [
  { id: "A1", label: "A1", lat: 11.034, lng: 77.028, stage: "Raw Material — Main Fabric", name: "S.S.V. Textiles Exim Pvt. Ltd.", address: "S.F.No.416/6, Iyappa Nagar, Thanneerpandal, Peelamedu, Coimbatore, 641004 Tamil Nadu, India", color: "#3b6fa0" },
  { id: "A2", label: "A2", lat: 28.649, lng: 77.228, stage: "Raw Material — Lining Fabric", name: "Balaji Textile Mills", address: "459, Haveli Haider Kuli, New Delhi Central Delhi, DELHI, 110006, Delhi, India", color: "#3b6fa0" },
  { id: "B1", label: "B1", lat: 10.989, lng: 78.074, stage: "Yarn — Main Fabric", name: "Lakshmi Textile Mills", address: "10/37, 512, Periya Vadugapatti, Manmangalam Karur, 639006 Tamil Nadu, India", color: "#3b6fa0" },
  { id: "B2", label: "B2", lat: 28.651, lng: 77.231, stage: "Yarn — Lining Fabric", name: "Balaji Textile Mills", address: "459, Haveli Haider Kuli, New Delhi Central Delhi, DELHI, 110006, Delhi, India", color: "#3b6fa0" },
  { id: "C1", label: "C1", lat: 11.039, lng: 77.032, stage: "Fabric — Weaving", name: "S.S.V. Textiles Exim Pvt. Ltd.", address: "S.F.No.416/6, Iyappa Nagar, Thanneerpandal, Peelamedu, Coimbatore, 641004 Tamil Nadu, India", color: "#3b6fa0" },
  { id: "C2", label: "C2", lat: 28.4595, lng: 77.0266, stage: "Fabric — Dyeing", name: "Jain Cord Industries Pvt. Ltd.", address: "Gurugram, Haryana, India", color: "#3b6fa0" },
  { id: "C3", label: "C3", lat: 28.653, lng: 77.234, stage: "Fabric — Weaving", name: "Balaji Textile Mills", address: "459, Haveli Haider Kuli, New Delhi Central Delhi, DELHI, 110006, Delhi, India", color: "#3b6fa0" },
  { id: "C4", label: "C4", lat: 28.4744, lng: 77.504, stage: "Fabric — Dyeing", name: "Shree Jagdamba Knits Pvt. Ltd.", address: "Greater Noida, Uttar Pradesh, India", color: "#3b6fa0" },
  { id: "D1", label: "D1", lat: 28.452, lng: 77.018, stage: "Trims — Labelling", name: "Byways Labels", address: "Gurugram, Haryana, India", color: "#0f1b3d" },
  { id: "D2", label: "D2", lat: 28.486, lng: 77.061, stage: "Trims — Zipper", name: "YKK", address: "Gurugram, Haryana, India", color: "#0f1b3d" },
  { id: "D3", label: "D3", lat: 9.851, lng: 76.751, stage: "Trims — Latex", name: "Signature Foam Pvt. Ltd.", address: "Velliyamattom, Kerala, India", color: "#0f1b3d" },
  { id: "E", label: "E", lat: 27.205, lng: 77.981, stage: "Packaging", name: "Vibhuti Packers", address: "Shop No. 350, Sector-1, T.P. Nagar, Agra, Uttar Pradesh, India", color: "#3b6fa0" },
  { id: "F", label: "F", lat: 23.489, lng: 85.474, stage: "CMT", name: "Kishor Exports", address: "Plot No. E,F,G Kulhi Industrial Area Ormanjhi, Ranchi-835219 (Jharkhand), India", color: "#0f1b3d" },
  { id: "G", label: "G", lat: 52.1326, lng: 5.2913, zoom: 7, stage: "Retailer", name: "Kishor Exports · Global Distribution", address: "Netherlands", color: "#0f1b3d" },
];