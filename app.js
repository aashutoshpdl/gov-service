const { useState, useEffect, useRef } = React;

// Official Design System Data & Translations
const TRANSLATIONS = {
  ne: {
    portalTitle: "नेपाल सरकार",
    portalSubtitle: "सङ्घीय मामिला तथा सामान्य प्रशासन मन्त्रालय",
    localBodyName: "काठमाडौँ महानगरपालिका",
    wardName: "वडा नं. ३२ कार्यालय, कोटेश्वर",
    provinceName: "बागमती प्रदेश, नेपाल",
    tagline: "नागरिक वडा सिफारिस तथा अनलाइन प्रमाणीकरण प्रणाली",
    home: "गृहपृष्ठ",
    services: "सिफारिस सेवाहरू",
    track: "निवेदन स्थिति खोज्नुहोस्",
    applyNow: "सिफारिस निवेदन दिनुहोस्",
    verifyQr: "प्रमाणपत्र प्रमाणीकरण",
    switchLang: "English",
    catalogTitle: "उपलब्ध वडा सिफारिस तथा प्रमाणीकरण सेवाहरू",
    catalogSubtitle: "नागरिकहरूले घरमै बसी विद्युतीय माध्यमबाट सिफारिसका लागि आवेदन दिन र आधिकारिक डिजिटल प्रमाणपत्र प्राप्त गर्न सक्नुहुनेछ।",
    trackTitle: "सिफारिस निवेदन ट्र्याकिङ",
    trackDesc: "तपाईंको आवेदन नम्बर (जस्तै: WRD-2083-0492) प्रविष्ट गरी पछिल्लो स्थिति थाहा पाउनुहोस्।",
    trackPlaceholder: "निवेदन संकेत नं. (उदा: WRD-2083-0492)",
    trackBtn: "स्थिति हेर्नुहोस्",
    recentSamples: "नमुना आवेदनहरू परिक्षण गर्नुहोस्:",
    fee: "सरकारी दस्तुर",
    timeEstimate: "लाग्ने समय",
    docsRequired: "आवश्यक कागजातहरू",
    applyForThis: "यो सिफारिसको लागि आवेदन भर्नुहोस्",
    step1Title: "नागरिक विवरण",
    step2Title: "सिफारिस विवरण",
    step3Title: "कागजात अपलोड",
    step4Title: "समीक्षा र पेश",
    fullName: "पूरा नाम (नेपालीमा)",
    fullNameEn: "पूरा नाम (अंग्रेजीमा)",
    citizenshipNo: "नागरिकता नं.",
    issuedDist: "जारी जिल्ला",
    mobileNo: "मोबाइल नम्बर",
    email: "इमेल (ऐच्छिक)",
    tole: "टोल / गाउँ",
    houseNo: "घर नं.",
    stepNext: "अर्को चरण",
    stepPrev: "अघिल्लो चरण",
    submitApp: "निवेदन पेश गर्नुहोस्",
    printCertificate: "सिफारिस पत्र प्रिन्ट गर्नुहोस्",
    downloadPdf: "पीडीएफ डाउनलोड",
    close: "बन्द गर्नुहोस्",
    statusStages: {
      submitted: "निवेदन दर्ता भएको",
      doc_verified: "कागजात प्रमाणीकरण",
      secretary_review: "वडा सचिव समीक्षा",
      chairperson_sign: "वडा अध्यक्ष हस्ताक्षर",
      approved: "सिफारिस स्वीकृत र जारी"
    },
    certificateHeading: "सिफारिस पत्र",
    refNo: "प.सं. (पत्र संख्या)",
    dispatchNo: "च.नं. (चलानी नं.)",
    date: "मिति",
    bs: "वि.सं.",
    ad: "ई.सं.",
    toWhom: "जो जससँग सम्बन्ध राख्दछ:",
    officialSeal: "कार्यालयको छाप",
    wardSecretary: "वडा सचिव",
    wardChairperson: "वडा अध्यक्ष",
    digitalVerificationNote: "यो सिफारिस पत्र डिजिटल हस्ताक्षर सहित विद्युतीय प्रणालीबाट जारी गरिएको हो। यसको आधिकारिकता दायाँ रहेको QR कोड स्क्यान गरी जाँच्न सकिन्छ।",
    footerCopyright: "© २०८१ काठमाडौँ महानगरपालिका, वडा नं. ३२ कार्यालय | स्थानीय सरकार सञ्चालन ऐन, २०७४ बमोजिम संचालित"
  },
  en: {
    portalTitle: "Government of Nepal",
    portalSubtitle: "Ministry of Federal Affairs and General Administration",
    localBodyName: "Kathmandu Metropolitan City",
    wardName: "Ward No. 32 Office, Koteshwor",
    provinceName: "Bagmati Province, Nepal",
    tagline: "Citizen Digital Ward Sifaris & Verification Portal",
    home: "Home",
    services: "Sifaris Services",
    track: "Track Application",
    applyNow: "Apply for Sifaris",
    verifyQr: "Verify Certificate",
    switchLang: "नेपाली",
    catalogTitle: "Available Ward Recommendations & Certifications",
    catalogSubtitle: "Citizens can apply online for local municipal recommendations and obtain authentic verified letters without standing in queues.",
    trackTitle: "Track Sifaris Application",
    trackDesc: "Enter your Application Tracking ID (e.g., WRD-2083-0492) to view live progress and download issued certificates.",
    trackPlaceholder: "Application Tracking ID (e.g. WRD-2083-0492)",
    trackBtn: "Track Status",
    recentSamples: "Test with demo tokens:",
    fee: "Statutory Fee",
    timeEstimate: "Estimated Time",
    docsRequired: "Required Documents",
    applyForThis: "Apply for this Service",
    step1Title: "Citizen Details",
    step2Title: "Specific Details",
    step3Title: "Upload Documents",
    step4Title: "Review & Submit",
    fullName: "Full Name (Devanagari)",
    fullNameEn: "Full Name (in English)",
    citizenshipNo: "Citizenship No.",
    issuedDist: "Issued District",
    mobileNo: "Mobile Number",
    email: "Email (Optional)",
    tole: "Tole / Street",
    houseNo: "House No.",
    stepNext: "Next Step",
    stepPrev: "Previous Step",
    submitApp: "Submit Application",
    printCertificate: "Print Sifaris Letter",
    downloadPdf: "Download PDF",
    close: "Close",
    statusStages: {
      submitted: "Application Registered",
      doc_verified: "Documents Verified",
      secretary_review: "Ward Secretary Review",
      chairperson_sign: "Ward Chairperson Signature",
      approved: "Recommendation Approved & Issued"
    },
    certificateHeading: "RECOMMENDATION CERTIFICATE",
    refNo: "Dispatch No.",
    dispatchNo: "Ref. No.",
    date: "Date",
    bs: "B.S.",
    ad: "A.D.",
    toWhom: "To Whom It May Concern:",
    officialSeal: "Official Ward Seal",
    wardSecretary: "Ward Secretary",
    wardChairperson: "Ward Chairperson",
    digitalVerificationNote: "This recommendation is electronically issued with cryptographic token validation under Local Governance Act 2074. Verify authenticity by scanning the QR code.",
    footerCopyright: "© 2024 Kathmandu Metropolitan City, Ward No. 32. All official rights reserved under Local Government Operation Act."
  }
};

const SERVICES_DATA = [
  {
    id: "nata-pramanit",
    code: "NP-01",
    titleNe: "नाता प्रमाणित सिफारिस",
    titleEn: "Relationship Verification (Nata Pramanit)",
    categoryNe: "व्यक्तिगत घटना तथा परिवार",
    categoryEn: "Vital & Family Status",
    feeNe: "रु. ५००/-",
    feeEn: "NPR 500/-",
    timeNe: "२ कार्य दिन",
    timeEn: "2 Working Days",
    descriptionNe: "निवेदक तथा निजका परिवारका सदस्यहरूबीचको रगतको नाता (बाबु, आमा, छोरा, छोरी, श्रीमान, श्रीमती) प्रमाणित गर्ने आधिकारिक सिफारिस।",
    descriptionEn: "Official ward recommendation verifying blood relation between the applicant and mentioned immediate family members.",
    docsNe: [
      "निवेदक तथा सम्पूर्ण सदस्यहरूको नागरिकता वा जन्मदर्ताको प्रतिलिपि",
      "जग्गाधनी प्रमाणपुर्जा वा घरबहाल सम्झौता वा बिजुली महसुल बिल",
      "पासपोर्ट साइजको हालसालै खिचिएको फोटो (प्रति सदस्य २ प्रति)",
      "विवाहित महिलाको हकमा विवाह दर्ता प्रमाण पत्र"
    ],
    docsEn: [
      "Citizenship certificate or birth certificates of all relatives",
      "Landownership certificate (Lalpurja) or house electricity bill",
      "Recent passport size photos of all family members",
      "Marriage registration certificate for married females"
    ],
    badge: "सर्वाधिक माग भएको / High Demand"
  },
  {
    id: "unmarried-cert",
    code: "UC-02",
    titleNe: "अविवाहित प्रमाणपत्र सिफारिस",
    titleEn: "Unmarried Status Recommendation",
    categoryNe: "व्यक्तिगत विवरण",
    categoryEn: "Personal Status",
    feeNe: "रु. ३००/-",
    feeEn: "NPR 300/-",
    timeNe: "१ कार्य दिन",
    timeEn: "Same/Next Day",
    descriptionNe: "विदेश अध्ययन, वैवाहिक प्रयोजन वा रोजगारका लागि निवेदक हालसम्म अविवाहित रहेको व्यहोरा वडा सर्जमिन मुचुल्का सहितको सिफारिस।",
    descriptionEn: "Official Ward attestation certifying the single/unmarried legal marital status of the citizen.",
    docsNe: [
      "निवेदकको नागरिकताको सक्कल र प्रतिलिपि",
      "बुबा/आमाको नागरिकताको प्रतिलिपि",
      "स्थानीय २ जना साक्षीको नागरिकता प्रतिलिपि तथा सर्जमिन",
      "२ प्रति पासपोर्ट साइजको फोटो"
    ],
    docsEn: [
      "Applicant's original and copy of Citizenship",
      "Father/Mother's Nepali Citizenship copies",
      "Two local witness citizenship copies and Sarjamin report",
      "2 passport size photos"
    ],
    badge: "अध्ययन/वैदेशिक प्रयोजन"
  },
  {
    id: "charkilla-cert",
    code: "CK-03",
    titleNe: "चारकिल्ला प्रमाणित सिफारिस",
    titleEn: "Property Boundary (Charkilla) Certification",
    categoryNe: "घरजग्गा तथा भौतिक पूर्वाधार",
    categoryEn: "Land & Property Infrastructure",
    feeNe: "रु. १,०००/-",
    feeEn: "NPR 1,000/-",
    timeNe: "३ कार्य दिन",
    timeEn: "3 Working Days",
    descriptionNe: "घर वा जग्गाको पूर्व, पश्चिम, उत्तर, दक्षिण चारै दिशातर्फको साँध-सिमाना तथा कित्ता नम्बर खुलाइएको आधिकारिक प्रमाणीकरण।",
    descriptionEn: "Certification of boundary plots, roads, and land orientation in four directions for banking, registry or construction purposes.",
    docsNe: [
      "जग्गाधनी दर्ता प्रमाणपुर्जा (लालपुर्जा) को प्रमाणित प्रतिलिपि",
      "चालु आर्थिक वर्षको सम्पत्ति तथा मालपोत कर तिरेको रसिद",
      "नापी नक्सा (ट्रेस नक्सा) र स्थलगत प्राविधिक प्रतिवेदन",
      "साविक र हालको बाटो खुलेको नक्सा"
    ],
    docsEn: [
      "Certified copy of Landownership Deed (Lalpurja)",
      "Current fiscal year Municipal property/land tax receipt",
      "Cadastral Trace Map and Ward Technical Site Inspection Report",
      "Road specification clearance report"
    ],
    badge: "मालपोत तथा बैंकिङ प्रयोजन"
  },
  {
    id: "electricity-cert",
    code: "EL-04",
    titleNe: "विद्युत मिटर जडान सिफारिस",
    titleEn: "Electricity Meter Installation Sifaris",
    categoryNe: "उपयोगिता तथा सार्वजनिक सेवा",
    categoryEn: "Utilities & Public Works",
    feeNe: "रु. २५०/-",
    feeEn: "NPR 250/-",
    timeNe: "१ कार्य दिन",
    timeEn: "1 Working Day",
    descriptionNe: "नयाँ बनेको घर वा संरचनामा नेपाल विद्युत प्राधिकरणबाट नयाँ विद्युत मिटर बक्स जडान गर्न वडा कार्यालयको सिफारिस पत्र।",
    descriptionEn: "Formal recommendation directed to Nepal Electricity Authority for residential or commercial power meter connection.",
    docsNe: [
      "घर निर्माण सम्पन्न प्रमाणपत्र वा अस्थायी अनुमति पत्र",
      "जग्गाको लालपुर्जा प्रतिलिपि र कर चुक्ता प्रमाणपत्र",
      "घरधनीको नागरिकता प्रमाणपत्रको प्रतिलिपि"
    ],
    docsEn: [
      "House Construction Completion Certificate or interim clearance",
      "Lalpurja and Ward Property Tax Clearance certificate",
      "Citizenship copy of the property owner"
    ],
    badge: "शीघ्र सेवा / Fast-track"
  },
  {
    id: "bipanna-cert",
    code: "BP-05",
    titleNe: "विपन्न नागरिक स्वास्थ्य उपचार सिफारिस",
    titleEn: "Indigent Citizen Medical Aid Sifaris",
    categoryNe: "सामाजिक सुरक्षा तथा स्वास्थ्य",
    categoryEn: "Social Security & Healthcare",
    feeNe: "निःशुल्क (रु. ०)",
    feeEn: "Free (NPR 0)",
    timeNe: "तत्काल / १ दिन",
    timeEn: "Same Day Express",
    descriptionNe: "कडा रोग (मिर्गौला, मुटु, क्यान्सर आदि) लागेका आर्थिक रुपमा असक्षम नागरिकहरूलाई सरकारी अस्पतालमा निःशुल्क उपचार सहायता सिफारिस।",
    descriptionEn: "Ward recommendation for impoverished citizens suffering from chronic conditions to access the National Free Health Subsidy Scheme.",
    docsNe: [
      "अस्पताल वा चिकित्सकको रोग निदान प्रेस्क्रिप्सन प्रतिवेदन",
      "नागरिकता वा नाबालक परिचयपत्र",
      "वडा टोल विकास संस्था वा प्रतिनिधिबाट आर्थिक अवस्था मुचुल्का"
    ],
    docsEn: [
      "Doctor's clinical diagnosis and hospital recommendation letter",
      "Applicant Nepali citizenship / minor identity card",
      "Income certification from Ward / Tole Development Committee"
    ],
    badge: "१००% निःशुल्क सेवा / Welfare"
  }
];

// Preloaded realistic demo applications for testing tracker
const INITIAL_TRACK_DATA = {
  "WRD-2083-0492": {
    id: "WRD-2083-0492",
    serviceId: "nata-pramanit",
    serviceNe: "नाता प्रमाणित सिफारिस",
    serviceEn: "Relationship Verification (Nata Pramanit)",
    applicantNameNe: "सुरेश कुमार श्रेष्ठ",
    applicantNameEn: "Suresh Kumar Shrestha",
    citizenshipNo: "२७-०१-७४-०२९१३",
    phone: "९८४१२३४५६७",
    wardNo: 32,
    tole: "जडिबुटी चोक, कोटेश्वर",
    submittedDateBs: "२०८१/०७/१२",
    submittedDateAd: "2024-10-28",
    currentStep: 4, // 0: submitted, 1: doc_verified, 2: secretary_review, 3: chairperson_sign, 4: approved
    statusTextNe: "सिफारिस स्वीकृत र जारी गरिएको",
    statusTextEn: "Approved and Officially Issued",
    statusTone: "success",
    remarksNe: "सम्पूर्ण कागजात रुजु भई वडा अध्यक्षबाट डिजिटल हस्ताक्षर सम्पन्न भइसकेको छ।",
    remarksEn: "All documents verified and digitally countersigned by Ward Chairperson.",
    members: [
      { name: "सुरेश कुमार श्रेष्ठ", relation: "स्वयं (निवेदक)", age: "३८", citizenNo: "२७-०१-७४-०२९१३" },
      { name: "सुनिता श्रेष्ठ", relation: "श्रीमती", age: "३४", citizenNo: "२७-०१-७६-०८८४१" },
      { name: "आरभ श्रेष्ठ", relation: "छोरा", age: "१०", citizenNo: "जन्मदर्ता: २०७१-८९०१" }
    ],
    certificateNo: "वडा३२/ना.प्र./२०८१-०८२/४९२",
    approvedDateBs: "२०८१/०७/१४",
    approvedDateAd: "2024-10-30"
  },
  "WRD-2083-0118": {
    id: "WRD-2083-0118",
    serviceId: "unmarried-cert",
    serviceNe: "अविवाहित प्रमाणपत्र सिफारिस",
    serviceEn: "Unmarried Status Recommendation",
    applicantNameNe: "प्रशंसा अधिकारी",
    applicantNameEn: "Prashansa Adhikari",
    citizenshipNo: "२२-०१-७८-०३४२१",
    phone: "९८५१०२३९८१",
    wardNo: 32,
    tole: "नरेफाँट मार्ग",
    submittedDateBs: "२०८१/०७/१५",
    submittedDateAd: "2024-10-31",
    currentStep: 2, // In Secretary review
    statusTextNe: "वडा सचिव समीक्षा प्रक्रियामा",
    statusTextEn: "Under Ward Secretary Review",
    statusTone: "warning",
    remarksNe: "स्थानीय साक्षी सर्जमिन मुचुल्का रुजु भइरहेको छ। आज साँझसम्म स्वीकृत हुनेछ।",
    remarksEn: "Local witness verification under review. Scheduled for chairperson signature.",
    members: [],
    certificateNo: null,
    approvedDateBs: null,
    approvedDateAd: null
  },
  "WRD-2083-9901": {
    id: "WRD-2083-9901",
    serviceId: "charkilla-cert",
    serviceNe: "चारकिल्ला प्रमाणित सिफारिस",
    serviceEn: "Property Boundary (Charkilla) Certification",
    applicantNameNe: "राजेन्द्र प्रसाद दाहाल",
    applicantNameEn: "Rajendra Prasad Dahal",
    citizenshipNo: "२७-०२-६२-००१८४",
    phone: "९८४१००८८२२",
    wardNo: 32,
    tole: "सुविधानगर",
    submittedDateBs: "२०८१/०७/१६",
    submittedDateAd: "2024-11-01",
    currentStep: 1, // Document verification
    statusTextNe: "कागजात प्रमाणीकरण चरणमा",
    statusTextEn: "Document Verification Phase",
    statusTone: "info",
    remarksNe: "नापी प्राविधिक टोलीद्वारा ट्रेस नक्सा स्थलगत निरीक्षणको कार्य बाँकी।",
    remarksEn: "Cadastral site verification scheduled with technical surveyor.",
    members: [],
    certificateNo: null,
    approvedDateBs: null,
    approvedDateAd: null
  }
};

function App() {
  const [lang, setLang] = useState("ne");
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); // 'home', 'services', 'track', 'apply'
  const [selectedService, setSelectedService] = useState(SERVICES_DATA[0]);
  const [trackingStore, setTrackingStore] = useState(INITIAL_TRACK_DATA);
  const [searchTokenInput, setSearchTokenInput] = useState("WRD-2083-0492");
  const [activeTrackResult, setActiveTrackResult] = useState(INITIAL_TRACK_DATA["WRD-2083-0492"]);
  const [searchError, setSearchError] = useState("");

  // Modal for Viewing Official Printable Sifaris Certificate
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [activeCertificateData, setActiveCertificateData] = useState(null);
  const qrCanvasRef = useRef(null);

  // Application Form State
  const [step, setStep] = useState(1);
  const [formCitizen, setFormCitizen] = useState({
    fullNameNe: "",
    fullNameEn: "",
    citizenshipNo: "",
    issuedDist: "काठमाडौँ",
    mobileNo: "",
    email: "",
    wardNo: "३२",
    tole: "",
    houseNo: ""
  });

  // Specific sub-fields (Relation table or Plot details)
  const [familyMembers, setFamilyMembers] = useState([
    { name: "", relation: "बाबु (Father)", age: "", citizenNo: "" },
    { name: "", relation: "आमा (Mother)", age: "", citizenNo: "" }
  ]);

  const [propertyData, setPropertyData] = useState({
    kittaNo: "",
    areaSqFt: "",
    eastBoundary: "",
    westBoundary: "",
    northBoundary: "",
    southBoundary: ""
  });

  const [filesUploaded, setFilesUploaded] = useState({
    citizenship: false,
    lalpurja: false,
    photo: false,
    recommendationDoc: false
  });

  const [submitting, setSubmitting] = useState(false);
  const [justSubmittedToken, setJustSubmittedToken] = useState(null);

  const t = TRANSLATIONS[lang];

  // Sync Dark Mode to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Refresh Lucide Icons whenever views change
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // Generate QR Code dynamically when Certificate Modal opens
  useEffect(() => {
    if (certModalOpen && activeCertificateData) {
      const container = document.getElementById("qrcode-container");
      if (container) {
        container.innerHTML = "";
        const verifyUrl = window.location.origin + window.location.pathname + "?verify=" + activeCertificateData.id;
        new QRCode(container, {
          text: `GovNepal-Ward32-Verif:${activeCertificateData.id}#${activeCertificateData.applicantNameEn}`,
          width: 90,
          height: 90,
          colorDark: "#003893",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.M
        });
      }
    }
  }, [certModalOpen, activeCertificateData]);

  // Handle Track Search
  const handleTrackSubmit = (e) => {
    if (e) e.preventDefault();
    const cleanToken = searchTokenInput.trim().toUpperCase();
    if (trackingStore[cleanToken]) {
      setActiveTrackResult(trackingStore[cleanToken]);
      setSearchError("");
    } else {
      setActiveTrackResult(null);
      setSearchError(lang === "ne" ? "उक्त टोकन नम्बर फेला परेन। कृपया WRD-2083-0492 वा अन्य टोकन जाँच्नुहोस्।" : "No records found for this token. Try testing with WRD-2083-0492.");
    }
  };

  // Handle New Application Submission
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newToken = `WRD-2083-${randomNum}`;
      const newRecord = {
        id: newToken,
        serviceId: selectedService.id,
        serviceNe: selectedService.titleNe,
        serviceEn: selectedService.titleEn,
        applicantNameNe: formCitizen.fullNameNe || "राम बहादुर तामाङ",
        applicantNameEn: formCitizen.fullNameEn || "Ram Bahadur Tamang",
        citizenshipNo: formCitizen.citizenshipNo || "२७-०१-७५-१२३४५",
        phone: formCitizen.mobileNo || "९८४१००००००",
        wardNo: 32,
        tole: formCitizen.tole || "कोटेश्वर",
        submittedDateBs: "२०८१/०७/१७",
        submittedDateAd: new Date().toISOString().split("T")[0],
        currentStep: 0,
        statusTextNe: "निवेदन दर्ता भएको र कागजात रुजु हुँदै",
        statusTextEn: "Submitted & Awaiting Initial Document Check",
        statusTone: "info",
        remarksNe: "तपाईंको सिफारिस निवेदन प्राविधिक शाखामा रुजुका लागि दर्ता भयो।",
        remarksEn: "Your application has been logged for municipal clerk verification.",
        members: familyMembers.filter(m => m.name.trim() !== ""),
        certificateNo: null,
        approvedDateBs: null,
        approvedDateAd: null
      };

      setTrackingStore(prev => ({ ...prev, [newToken]: newRecord }));
      setJustSubmittedToken(newToken);
      setActiveTrackResult(newRecord);
      setSearchTokenInput(newToken);
      setSubmitting(false);
      setStep(5); // Success step
    }, 900);
  };

  const openCertificateView = (item) => {
    setActiveCertificateData(item);
    setCertModalOpen(true);
  };

  const addFamilyMemberRow = () => {
    setFamilyMembers(prev => [...prev, { name: "", relation: "छोरा/छोरी", age: "", citizenNo: "" }]);
  };

  const updateFamilyMember = (index, field, val) => {
    const updated = [...familyMembers];
    updated[index][field] = val;
    setFamilyMembers(updated);
  };

  const removeFamilyMember = (index) => {
    setFamilyMembers(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* TOP EMERGENCY/ANNOUNCEMENT BANNER */}
      <div className="gov-flag-stripe h-1.5 w-full"></div>
      
      {/* GOVERNMENT HEADER */}
      <header className="bg-white dark:bg-gov-cardDark border-b border-gov-borderLight dark:border-gov-borderDark shadow-sm sticky top-0 z-30 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Official Nepal Emblem & Ward Identification */}
            <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => setActiveTab("home")}>
              {/* Official Nepal Coat of Arms SVG */}
              <svg className="w-14 h-14 flex-shrink-0 text-gov-crimson" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
                <path d="M50 8C35 8 20 20 20 38C20 62 50 92 50 92C50 92 80 62 80 38C80 20 65 8 50 8ZM50 24C53 24 56 26.5 56 29.5C56 32.5 53 35 50 35C47 35 44 32.5 44 29.5C44 26.5 47 24 50 24ZM42 42C44 40 48 39 50 39C52 39 56 40 58 42C61 45 61 50 59 54L55 62C54 64 52 65 50 65C48 65 46 64 45 62L41 54C39 50 39 45 42 42Z" />
                <path d="M28 25L32 30L26 34L30 39L22 41L25 48C16 40 18 28 28 25ZM72 25L68 30L74 34L70 39L78 41L75 48C84 40 82 28 72 25Z" opacity="0.8" />
                <circle cx="50" cy="29" r="4" fill="#D4AF37" />
              </svg>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gov-crimson dark:text-red-400">
                    {t.portalTitle} | {t.portalSubtitle}
                  </span>
                </div>
                <h1 className="text-lg md:text-xl font-bold text-gov-blue dark:text-blue-300 leading-tight">
                  {t.localBodyName}
                </h1>
                <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300">
                  {t.wardName}, {t.provinceName}
                </p>
              </div>
            </div>

            {/* Right Tools: Language & Theme Toggles & Quick Track */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setLang(lang === "ne" ? "en" : "ne")}
                className="px-3 py-1.5 rounded-md text-xs font-bold border border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-900 transition flex items-center space-x-1.5 shadow-sm"
                title="Change Language"
              >
                <i data-lucide="languages" className="w-4 h-4"></i>
                <span>{t.switchLang}</span>
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-md border border-slate-300 dark:border-gov-borderDark text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-label="Toggle Dark Theme"
              >
                <i data-lucide={darkMode ? "sun" : "moon"} className="w-4 h-4"></i>
              </button>

              <button
                onClick={() => {
                  setActiveTab("apply");
                  setStep(1);
                  setJustSubmittedToken(null);
                }}
                className="hidden sm:inline-flex items-center space-x-1.5 bg-gov-crimson hover:bg-gov-crimsondark text-white font-semibold text-xs md:text-sm px-4 py-2 rounded shadow-md transition transform active:scale-95"
              >
                <i data-lucide="file-plus-2" className="w-4 h-4"></i>
                <span>{t.applyNow}</span>
              </button>
            </div>
          </div>

          {/* Main Navigation Bar */}
          <nav className="flex space-x-1 sm:space-x-4 border-t border-slate-100 dark:border-gov-borderDark pt-1 pb-2 overflow-x-auto text-sm font-medium">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-3 py-1.5 rounded transition flex items-center space-x-1.5 ${
                activeTab === "home"
                  ? "text-gov-blue dark:text-blue-400 font-bold border-b-2 border-gov-blue dark:border-blue-400 bg-blue-50 dark:bg-slate-800"
                  : "text-slate-600 dark:text-slate-300 hover:text-gov-blue"
              }`}
            >
              <i data-lucide="home" className="w-4 h-4"></i>
              <span>{t.home}</span>
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`px-3 py-1.5 rounded transition flex items-center space-x-1.5 ${
                activeTab === "services"
                  ? "text-gov-blue dark:text-blue-400 font-bold border-b-2 border-gov-blue dark:border-blue-400 bg-blue-50 dark:bg-slate-800"
                  : "text-slate-600 dark:text-slate-300 hover:text-gov-blue"
              }`}
            >
              <i data-lucide="layout-grid" className="w-4 h-4"></i>
              <span>{t.services}</span>
            </button>

            <button
              onClick={() => setActiveTab("track")}
              className={`px-3 py-1.5 rounded transition flex items-center space-x-1.5 ${
                activeTab === "track"
                  ? "text-gov-blue dark:text-blue-400 font-bold border-b-2 border-gov-blue dark:border-blue-400 bg-blue-50 dark:bg-slate-800"
                  : "text-slate-600 dark:text-slate-300 hover:text-gov-blue"
              }`}
            >
              <i data-lucide="search-check" className="w-4 h-4"></i>
              <span>{t.track}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("apply");
                setStep(1);
                setJustSubmittedToken(null);
              }}
              className={`px-3 py-1.5 rounded transition flex items-center space-x-1.5 ${
                activeTab === "apply"
                  ? "text-gov-blue dark:text-blue-400 font-bold border-b-2 border-gov-blue dark:border-blue-400 bg-blue-50 dark:bg-slate-800"
                  : "text-slate-600 dark:text-slate-300 hover:text-gov-blue"
              }`}
            >
              <i data-lucide="edit-3" className="w-4 h-4"></i>
              <span>{t.applyNow}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* HERO SECTION / NOTICES */}
      {activeTab === "home" && (
        <section className="bg-gradient-to-r from-gov-blue to-gov-bluedark text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden shadow-inner">
          <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
            <svg className="w-96 h-96 fill-white" viewBox="0 0 100 100">
              <polygon points="50,5 95,95 5,95" />
            </svg>
          </div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gov-crimson text-white mb-3 shadow-sm">
              <i data-lucide="shield-check" className="w-3.5 h-3.5 mr-1"></i>
              डिजिटल नेपाल तथा स्थानीय सरकार सुशासन कार्यक्रम
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {lang === "ne"
                ? "वडा कार्यालय नधाईकनै पाउनुहोस् डिजिटल सिफारिस"
                : "Official Ward Recommendations Delivered Online"}
            </h2>
            <p className="text-blue-100 text-sm sm:text-lg max-w-3xl mx-auto mb-8 font-light leading-relaxed">
              {lang === "ne"
                ? "नाता प्रमाणित, अविवाहित सिफारिस, चारकिल्ला र विपन्न स्वास्थ्य सिफारिस अब २४ घण्टाभित्र अनलाइनबाटै प्रमाणीकरण र क्युआर कोडयुक्त पत्र प्राप्त गर्नुहोस्।"
                : "Apply from home, monitor real-time review stages, and access tamper-proof cryptographic ward certificates verified under Nepal ICT laws."}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  setActiveTab("apply");
                  setStep(1);
                  setJustSubmittedToken(null);
                }}
                className="bg-gov-crimson hover:bg-gov-crimsondark text-white font-bold px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 transition transform hover:-translate-y-0.5"
              >
                <i data-lucide="pen-tool" className="w-5 h-5"></i>
                <span>{t.applyNow}</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("track");
                }}
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg backdrop-blur-sm transition flex items-center space-x-2"
              >
                <i data-lucide="search" className="w-5 h-5"></i>
                <span>{t.track}</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10 text-left">
              <div className="bg-white/5 p-3 rounded border border-white/10">
                <p className="text-xs text-blue-200 uppercase font-semibold">आजसम्म जारी सिफारिस</p>
                <p className="text-2xl font-bold font-teko tracking-wide">२,४८०+</p>
              </div>
              <div className="bg-white/5 p-3 rounded border border-white/10">
                <p className="text-xs text-blue-200 uppercase font-semibold">औसत सम्पादन समय</p>
                <p className="text-2xl font-bold font-teko tracking-wide">१ कार्य दिन</p>
              </div>
              <div className="bg-white/5 p-3 rounded border border-white/10">
                <p className="text-xs text-blue-200 uppercase font-semibold">डिजिटल प्रमाणीकरण</p>
                <p className="text-2xl font-bold font-teko tracking-wide">१००% सुरक्षित</p>
              </div>
              <div className="bg-white/5 p-3 rounded border border-white/10">
                <p className="text-xs text-blue-200 uppercase font-semibold">नागरिक सन्तुष्टि दर</p>
                <p className="text-2xl font-bold font-teko tracking-wide">९८.४%</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* TAB 1: SERVICE CATALOG (Also shown on Home) */}
        {(activeTab === "home" || activeTab === "services") && (
          <div>
            <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between border-b pb-4 border-slate-200 dark:border-gov-borderDark">
              <div>
                <h3 className="text-2xl font-bold text-gov-blue dark:text-blue-400 flex items-center space-x-2">
                  <i data-lucide="folder-archive" className="w-6 h-6 text-gov-crimson"></i>
                  <span>{t.catalogTitle}</span>
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
                  {t.catalogSubtitle}
                </p>
              </div>
              <div className="mt-3 md:mt-0">
                <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 text-gov-blue dark:bg-blue-950 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800">
                  ५ वटा प्राथमिक सेवाहरू सुचारु
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES_DATA.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white dark:bg-gov-cardDark rounded-xl border border-slate-200 dark:border-gov-borderDark shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-xs font-bold text-gov-crimson dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2.5 py-0.5 rounded border border-red-100 dark:border-red-900">
                        {srv.code}
                      </span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {lang === "ne" ? srv.categoryNe : srv.categoryEn}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-gov-blue transition mb-2">
                      {lang === "ne" ? srv.titleNe : srv.titleEn}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                      {lang === "ne" ? srv.descriptionNe : srv.descriptionEn}
                    </p>

                    {/* Fees & Timeline Pill */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700 text-xs mb-4">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block font-normal">{t.fee}:</span>
                        <span className="font-bold text-gov-blue dark:text-blue-300">
                          {lang === "ne" ? srv.feeNe : srv.feeEn}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block font-normal">{t.timeEstimate}:</span>
                        <span className="font-bold text-slate-700 dark:text-slate-200">
                          {lang === "ne" ? srv.timeNe : srv.timeEn}
                        </span>
                      </div>
                    </div>

                    {/* Required Documents Checklist Collapsible Preview */}
                    <div>
                      <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1">
                        <i data-lucide="paperclip" className="w-3.5 h-3.5 text-gov-crimson"></i>
                        <span>{t.docsRequired}</span>
                      </h5>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 pl-1">
                        {(lang === "ne" ? srv.docsNe : srv.docsEn).slice(0, 3).map((d, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <i data-lucide="check-circle-2" className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0"></i>
                            <span className="truncate">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-gov-crimson font-medium">
                      {srv.badge}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedService(srv);
                        setActiveTab("apply");
                        setStep(1);
                        setJustSubmittedToken(null);
                      }}
                      className="px-3.5 py-1.5 bg-gov-blue hover:bg-gov-bluedark text-white rounded text-xs font-bold transition flex items-center space-x-1 shadow-sm"
                    >
                      <span>{lang === "ne" ? "आवेदन भर्नुहोस्" : "Apply Online"}</span>
                      <i data-lucide="chevron-right" className="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE APPLICATION TRACKING VIEW */}
        {activeTab === "track" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gov-cardDark p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-gov-borderDark shadow-sm mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-red-50 dark:bg-red-950 text-gov-crimson rounded-lg">
                  <i data-lucide="radar" className="w-7 h-7"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t.trackTitle}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">{t.trackDesc}</p>
                </div>
              </div>

              {/* Search Bar Form */}
              <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-2 mt-4">
                <div className="relative flex-1">
                  <i data-lucide="hash" className="w-5 h-5 absolute left-3 top-3 text-slate-400"></i>
                  <input
                    type="text"
                    value={searchTokenInput}
                    onChange={(e) => setSearchTokenInput(e.target.value)}
                    placeholder={t.trackPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gov-blue text-sm uppercase font-mono tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gov-blue hover:bg-gov-bluedark text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow transition flex items-center justify-center space-x-2"
                >
                  <i data-lucide="search" className="w-4 h-4"></i>
                  <span>{t.trackBtn}</span>
                </button>
              </form>

              {/* Sample Token Helpers */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{t.recentSamples}</span>
                {Object.keys(trackingStore).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSearchTokenInput(key);
                      setActiveTrackResult(trackingStore[key]);
                      setSearchError("");
                    }}
                    className="underline font-mono text-gov-blue dark:text-blue-400 hover:text-gov-crimson transition"
                  >
                    {key}
                  </button>
                ))}
              </div>

              {searchError && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/80 border border-red-200 text-red-700 dark:text-red-300 text-xs rounded-lg flex items-center space-x-2">
                  <i data-lucide="alert-circle" className="w-4 h-4 flex-shrink-0"></i>
                  <span>{searchError}</span>
                </div>
              )}
            </div>

            {/* Active Tracking Result Card */}
            {activeTrackResult && (
              <div className="bg-white dark:bg-gov-cardDark rounded-xl border border-slate-200 dark:border-gov-borderDark shadow-sm overflow-hidden">
                {/* Header Strip */}
                <div className="bg-slate-50 dark:bg-slate-800/80 p-5 border-b border-slate-200 dark:border-gov-borderDark flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                      निवेदन दर्ता टोकन / Tracking Token
                    </span>
                    <h4 className="text-2xl font-extrabold font-mono text-gov-blue dark:text-blue-300">
                      {activeTrackResult.id}
                    </h4>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        activeTrackResult.currentStep === 4
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                          : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
                      }`}
                    >
                      {lang === "ne" ? activeTrackResult.statusTextNe : activeTrackResult.statusTextEn}
                    </span>

                    {activeTrackResult.currentStep === 4 && (
                      <button
                        onClick={() => openCertificateView(activeTrackResult)}
                        className="bg-gov-crimson hover:bg-gov-crimsondark text-white font-bold text-xs px-3.5 py-1.5 rounded flex items-center space-x-1.5 shadow transition animate-pulse"
                      >
                        <i data-lucide="award" className="w-4 h-4"></i>
                        <span>{lang === "ne" ? "डिजिटल सिफारिस पत्र हेर्नुहोस्" : "View Issued Sifaris"}</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {/* Citizen & Service Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-xs">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">सिफारिस प्रकार / Service:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                        {lang === "ne" ? activeTrackResult.serviceNe : activeTrackResult.serviceEn}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">निवेदकको नाम / Applicant:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                        {lang === "ne" ? activeTrackResult.applicantNameNe : activeTrackResult.applicantNameEn}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">नागरिकता नं. / Citizenship No:</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                        {activeTrackResult.citizenshipNo}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">स्थानीय ठेगाना / Address:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        वडा नं. {activeTrackResult.wardNo}, {activeTrackResult.tole}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">निवेदन मिति / Date:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                        {activeTrackResult.submittedDateBs} ({activeTrackResult.submittedDateAd})
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">सम्पर्क फोन / Mobile:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                        {activeTrackResult.phone}
                      </span>
                    </div>
                  </div>

                  {/* Five Stage Progress Timeline */}
                  <h5 className="text-xs uppercase font-bold text-slate-600 dark:text-slate-300 tracking-wider mb-4 flex items-center space-x-1.5">
                    <i data-lucide="milestone" className="w-4 h-4 text-gov-blue"></i>
                    <span>प्रमाणीकरण प्रगति विवरण (Workflow Timeline)</span>
                  </h5>

                  <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 pl-6 space-y-6 my-4">
                    {[
                      { key: "submitted", title: t.statusStages.submitted, descNe: "नागरिक पोर्टलबाट आवेदन तथा विवरण प्राप्त भएको।" },
                      { key: "doc_verified", title: t.statusStages.doc_verified, descNe: "नागरिकता, लालपुर्जा तथा अन्य आवश्यक कागजात रुजु सम्पन्न।" },
                      { key: "secretary_review", title: t.statusStages.secretary_review, descNe: "वडा सचिवद्वारा कानुनी अधिकार तथा सर्जमिन मुचुल्का मूल्याङ्कन।" },
                      { key: "chairperson_sign", title: t.statusStages.chairperson_sign, descNe: "वडा अध्यक्षद्वारा डिजिटल प्रमाणीकरण तथा आधिकारिक स्वीकृति।" },
                      { key: "approved", title: t.statusStages.approved, descNe: "क्युआर कोड सहितको आधिकारिक सिफारिस पत्र जारी भइसकेको।" }
                    ].map((stg, idx) => {
                      const isCompleted = activeTrackResult.currentStep >= idx;
                      const isCurrent = activeTrackResult.currentStep === idx;
                      return (
                        <div key={stg.key} className="relative group">
                          {/* Dot */}
                          <div
                            className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 transition-all ${
                              isCompleted
                                ? "bg-emerald-600 border-white dark:border-gov-cardDark ring-4 ring-emerald-100 dark:ring-emerald-950"
                                : isCurrent
                                ? "bg-gov-blue border-white dark:border-gov-cardDark ring-4 ring-blue-100 dark:ring-blue-950 animate-pulse"
                                : "bg-slate-300 dark:bg-slate-700 border-white dark:border-gov-cardDark"
                            }`}
                          ></div>

                          <div>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`text-sm font-bold ${
                                  isCompleted ? "text-emerald-700 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"
                                }`}
                              >
                                {idx + 1}. {stg.title}
                              </span>
                              {isCompleted && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                                  सम्पन्न
                                </span>
                              )}
                              {isCurrent && activeTrackResult.currentStep !== 4 && (
                                <span className="text-[10px] bg-blue-100 text-gov-blue dark:bg-blue-950 dark:text-blue-300 px-1.5 py-0.5 rounded font-bold animate-pulse">
                                  प्रक्रियामा
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                              {stg.descNe}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Remarks Box */}
                  <div className="mt-6 p-4 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs">
                    <div className="flex items-start space-x-2">
                      <i data-lucide="info" className="w-4 h-4 text-gov-blue dark:text-blue-400 mt-0.5 flex-shrink-0"></i>
                      <div>
                        <span className="font-bold text-gov-blue dark:text-blue-300 block mb-0.5">
                          कार्यालय कैफियत / Official Ward Remarks:
                        </span>
                        <p className="text-slate-700 dark:text-slate-300">
                          {lang === "ne" ? activeTrackResult.remarksNe : activeTrackResult.remarksEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MULTI-STEP SIFARIS APPLICATION ENGINE */}
        {activeTab === "apply" && (
          <div className="max-w-3xl mx-auto">
            {step === 5 ? (
              /* SUCCESS CONFIRMATION SCREEN */
              <div className="bg-white dark:bg-gov-cardDark p-8 rounded-xl border border-slate-200 dark:border-gov-borderDark shadow text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i data-lucide="check-check" className="w-9 h-9"></i>
                </div>
                <h3 className="text-2xl font-extrabold text-gov-blue dark:text-blue-300 mb-2">
                  सिफारिस निवेदन सफलतापूर्वक दर्ता भयो!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-6">
                  तपाईंको निवेदन वडा नं. ३२ कार्यालयमा प्रमाणीकरणको लागि पेश भइसकेको छ। कृपया तल दिइएको टोकन नम्बर सुरक्षित राख्नुहोला।
                </p>

                <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-gov-blue/40 p-4 rounded-lg inline-block mx-auto mb-6">
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold block">तपाईंको ट्र्याकिङ टोकन / Tracking Token</span>
                  <span className="text-3xl font-mono font-bold text-gov-crimson tracking-wider">
                    {justSubmittedToken}
                  </span>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      setActiveTab("track");
                      setSearchTokenInput(justSubmittedToken);
                      handleTrackSubmit();
                    }}
                    className="px-5 py-2.5 bg-gov-blue hover:bg-gov-bluedark text-white rounded-lg font-bold text-sm shadow transition flex items-center space-x-2"
                  >
                    <i data-lucide="external-link" className="w-4 h-4"></i>
                    <span>ट्र्याकिङ स्थिति हेर्नुहोस्</span>
                  </button>

                  <button
                    onClick={() => {
                      setStep(1);
                      setJustSubmittedToken(null);
                    }}
                    className="px-5 py-2.5 border border-slate-300 dark:border-gov-borderDark text-slate-700 dark:text-slate-200 rounded-lg font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    नयाँ आवेदन भर्नुहोस्
                  </button>
                </div>
              </div>
            ) : (
              /* MULTI-STEP WIZARD */
              <div className="bg-white dark:bg-gov-cardDark rounded-xl border border-slate-200 dark:border-gov-borderDark shadow-sm overflow-hidden">
                {/* Selected Service Top Header */}
                <div className="bg-gov-blue text-white p-4 sm:p-5 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-blue-200 font-medium">
                      अनलाइन सिफारिस फारम / Sifaris Application
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold flex items-center space-x-2">
                      <i data-lucide="file-text" className="w-5 h-5 text-gov-gold"></i>
                      <span>{lang === "ne" ? selectedService.titleNe : selectedService.titleEn}</span>
                    </h3>
                  </div>
                  <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded backdrop-blur-sm">
                    {selectedService.code}
                  </span>
                </div>

                {/* Stepper Navigation Indicator */}
                <div className="grid grid-cols-4 border-b border-slate-200 dark:border-gov-borderDark text-xs font-bold text-center bg-slate-50 dark:bg-slate-800/50">
                  {[1, 2, 3, 4].map((sNum) => {
                    const labels = [t.step1Title, t.step2Title, t.step3Title, t.step4Title];
                    const isDone = step > sNum;
                    const isCurrent = step === sNum;
                    return (
                      <div
                        key={sNum}
                        className={`py-3 px-2 border-r last:border-r-0 border-slate-200 dark:border-gov-borderDark flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                          isCurrent
                            ? "bg-blue-100/60 dark:bg-blue-950 text-gov-blue dark:text-blue-300 border-b-2 border-b-gov-blue"
                            : isDone
                            ? "text-emerald-700 dark:text-emerald-400"
                            : "text-slate-400"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono ${
                            isCurrent
                              ? "bg-gov-blue text-white"
                              : isDone
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {isDone ? "✓" : sNum}
                        </span>
                        <span className="hidden sm:inline truncate">{labels[sNum - 1]}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Form Body */}
                <div className="p-6">
                  {/* STEP 1: CITIZEN DEMOGRAPHICS */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">
                          १. निवेदकको व्यक्तिगत तथा बसोबास विवरण
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          नागरिकता प्रमाणपत्र अनुसार आफ्नो शुद्ध विवरण भर्नुहोस्।
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                            {t.fullName} *
                          </label>
                          <input
                            type="text"
                            required
                            value={formCitizen.fullNameNe}
                            onChange={(e) => setFormCitizen({ ...formCitizen, fullNameNe: e.target.value })}
                            placeholder="उदा: सुरज केसी"
                            className="w-full p-2.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-gov-blue text-sm"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                            {t.fullNameEn} *
                          </label>
                          <input
                            type="text"
                            required
                            value={formCitizen.fullNameEn}
                            onChange={(e) => setFormCitizen({ ...formCitizen, fullNameEn: e.target.value })}
                            placeholder="e.g. Suraj KC"
                            className="w-full p-2.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-gov-blue text-sm"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                            {t.citizenshipNo} *
                          </label>
                          <input
                            type="text"
                            required
                            value={formCitizen.citizenshipNo}
                            onChange={(e) => setFormCitizen({ ...formCitizen, citizenshipNo: e.target.value })}
                            placeholder="२७-०१-७५-००१२३"
                            className="w-full p-2.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-gov-blue text-sm font-mono"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                            {t.issuedDist} *
                          </label>
                          <select
                            value={formCitizen.issuedDist}
                            onChange={(e) => setFormCitizen({ ...formCitizen, issuedDist: e.target.value })}
                            className="w-full p-2.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-gov-blue text-sm"
                          >
                            <option value="काठमाडौँ">काठमाडौँ (Kathmandu)</option>
                            <option value="ललितपुर">ललितपुर (Lalitpur)</option>
                            <option value="भक्तपुर">भक्तपुर (Bhaktapur)</option>
                            <option value="काभ्रेपलाञ्चोक">काभ्रेपलाञ्चोक</option>
                            <option value="मोरङ">मोरङ</option>
                            <option value="कास्की">कास्की</option>
                            <option value="अन्य">अन्य जिल्ला</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                            {t.mobileNo} *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formCitizen.mobileNo}
                            onChange={(e) => setFormCitizen({ ...formCitizen, mobileNo: e.target.value })}
                            placeholder="९८XXXXXXXX"
                            className="w-full p-2.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-gov-blue text-sm font-mono"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                            {t.email}
                          </label>
                          <input
                            type="email"
                            value={formCitizen.email}
                            onChange={(e) => setFormCitizen({ ...formCitizen, email: e.target.value })}
                            placeholder="citizen@example.com"
                            className="w-full p-2.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-gov-blue text-sm"
                          />
                        </div>

                        <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                              {t.tole} *
                            </label>
                            <input
                              type="text"
                              required
                              value={formCitizen.tole}
                              onChange={(e) => setFormCitizen({ ...formCitizen, tole: e.target.value })}
                              placeholder="उदा: जडिबुटी, नरेफाँट, कोटेश्वर"
                              className="w-full p-2.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-gov-blue text-sm"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                              वडा नं. (स्थायी)
                            </label>
                            <input
                              type="text"
                              disabled
                              value="३२ (काठमाडौँ महानगरपालिका)"
                              className="w-full p-2.5 rounded border border-slate-200 dark:border-gov-borderDark bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm cursor-not-allowed font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: SERVICE-SPECIFIC LOGIC (e.g., Family Tree or Plot Boundaries) */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">
                          २. सिफारिस सम्बन्धित विशिष्ट विवरण
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {selectedService.id === "nata-pramanit"
                            ? "प्रमाणित गरिने परिवारका सदस्यहरूको विवरण तालिकामा थप्नुहोस्।"
                            : selectedService.id === "charkilla-cert"
                            ? "घरजग्गाको कित्ता नम्बर तथा चारैतर्फको साँध-सिमाना भर्नुहोस्।"
                            : "यस सिफारिसको लागि आवश्यक विस्तृत जानकारी भर्नुहोस्।"}
                        </p>
                      </div>

                      {/* If Relationship Verification: Show Family Table */}
                      {selectedService.id === "nata-pramanit" && (
                        <div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border border-slate-200 dark:border-gov-borderDark rounded">
                              <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200">
                                <tr>
                                  <th className="p-2.5">क्र.सं.</th>
                                  <th className="p-2.5">सदस्यको पूरा नाम</th>
                                  <th className="p-2.5">निवेदकसँगको नाता</th>
                                  <th className="p-2.5">उमेर</th>
                                  <th className="p-2.5">नागरिकता/जन्मदर्ता नं.</th>
                                  <th className="p-2.5 text-center">कार्य</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {familyMembers.map((m, idx) => (
                                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                                    <td className="p-2 font-mono text-center">{idx + 1}</td>
                                    <td className="p-2">
                                      <input
                                        type="text"
                                        value={m.name}
                                        onChange={(e) => updateFamilyMember(idx, "name", e.target.value)}
                                        placeholder="नातेदारको नाम"
                                        className="w-full p-1.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-xs"
                                      />
                                    </td>
                                    <td className="p-2">
                                      <input
                                        type="text"
                                        value={m.relation}
                                        onChange={(e) => updateFamilyMember(idx, "relation", e.target.value)}
                                        placeholder="उदा: बाबु, आमा, श्रीमती"
                                        className="w-full p-1.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-xs"
                                      />
                                    </td>
                                    <td className="p-2 w-16">
                                      <input
                                        type="text"
                                        value={m.age}
                                        onChange={(e) => updateFamilyMember(idx, "age", e.target.value)}
                                        placeholder="उमेर"
                                        className="w-full p-1.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-xs text-center"
                                      />
                                    </td>
                                    <td className="p-2">
                                      <input
                                        type="text"
                                        value={m.citizenNo}
                                        onChange={(e) => updateFamilyMember(idx, "citizenNo", e.target.value)}
                                        placeholder="नागरिकता वा जन्मदर्ता"
                                        className="w-full p-1.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-xs font-mono"
                                      />
                                    </td>
                                    <td className="p-2 text-center">
                                      <button
                                        type="button"
                                        onClick={() => removeFamilyMember(idx)}
                                        disabled={familyMembers.length <= 1}
                                        className="text-red-500 hover:text-red-700 disabled:opacity-30 p-1"
                                      >
                                        <i data-lucide="trash-2" className="w-4 h-4"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <button
                            type="button"
                            onClick={addFamilyMemberRow}
                            className="mt-3 text-xs font-bold text-gov-blue dark:text-blue-400 hover:text-gov-crimson flex items-center space-x-1"
                          >
                            <i data-lucide="plus-circle" className="w-4 h-4"></i>
                            <span>+ अर्को सदस्य थप्नुहोस् (Add Family Member)</span>
                          </button>
                        </div>
                      )}

                      {/* If Charkilla: Show Plot & Boundary Fields */}
                      {selectedService.id === "charkilla-cert" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div>
                            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                              जग्गाको कित्ता नम्बर (Plot / Kitta No.) *
                            </label>
                            <input
                              type="text"
                              value={propertyData.kittaNo}
                              onChange={(e) => setPropertyData({ ...propertyData, kittaNo: e.target.value })}
                              placeholder="उदा: कित्ता नं. २८५"
                              className="w-full p-2.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-sm font-mono"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                              क्षेत्रफल (Area / Sq. Feet वा रोपनी)
                            </label>
                            <input
                              type="text"
                              value={propertyData.areaSqFt}
                              onChange={(e) => setPropertyData({ ...propertyData, areaSqFt: e.target.value })}
                              placeholder="उदा: ०-४-२-० वा १५० वर्ग मिटर"
                              className="w-full p-2.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-sm"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                              पूर्व साँध (East Boundary) *
                            </label>
                            <input
                              type="text"
                              value={propertyData.eastBoundary}
                              onChange={(e) => setPropertyData({ ...propertyData, eastBoundary: e.target.value })}
                              placeholder="उदा: हरिभक्तको जग्गा"
                              className="w-full p-2.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-sm"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                              पश्चिम साँध (West Boundary) *
                            </label>
                            <input
                              type="text"
                              value={propertyData.westBoundary}
                              onChange={(e) => setPropertyData({ ...propertyData, westBoundary: e.target.value })}
                              placeholder="उदा: ६ मिटर पक्की बाटो"
                              className="w-full p-2.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-sm"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                              उत्तर साँध (North Boundary) *
                            </label>
                            <input
                              type="text"
                              value={propertyData.northBoundary}
                              onChange={(e) => setPropertyData({ ...propertyData, northBoundary: e.target.value })}
                              placeholder="उदा: कित्ता नं. २८४ को जग्गा"
                              className="w-full p-2.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-sm"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                              दक्षिण साँध (South Boundary) *
                            </label>
                            <input
                              type="text"
                              value={propertyData.southBoundary}
                              onChange={(e) => setPropertyData({ ...propertyData, southBoundary: e.target.value })}
                              placeholder="उदा: रामप्रसाद शर्माको कित्ता"
                              className="w-full p-2.5 rounded border border-slate-300 dark:border-gov-borderDark bg-slate-50 dark:bg-slate-900 text-sm"
                            />
                          </div>
                        </div>
                      )}

                      {/* Default Note for other services like Unmarried/Electricity */}
                      {selectedService.id !== "nata-pramanit" && selectedService.id !== "charkilla-cert" && (
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-gov-borderDark text-xs text-slate-700 dark:text-slate-300 space-y-3">
                          <p className="font-semibold">
                            सिफारिस प्रयोजन खुलाउनुहोस्:
                          </p>
                          <textarea
                            rows="3"
                            placeholder="यस सिफारिस लिनुको प्रयोजन (उदा: अध्ययनका लागि वैदेशिक भिसा प्रयोजनार्थ वा विद्युत प्राधिकरणमा मिटर जडानार्थ)..."
                            className="w-full p-2.5 rounded border border-slate-300 dark:border-gov-borderDark bg-white dark:bg-slate-800 text-sm"
                          ></textarea>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 3: DOCUMENT UPLOADS */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">
                          ३. आवश्यक प्रमाण कागजातहरू अपलोड
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          कागजातहरू स्पष्ट बुझिने गरी PDF वा JPG/PNG (अधिकतम 2MB) अपलोड गर्नुहोस्।
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        {/* Doc 1: Citizenship */}
                        <div className="border border-dashed border-slate-300 dark:border-gov-borderDark p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center">
                          <i data-lucide="file-badge-2" className="w-8 h-8 text-gov-blue mb-2"></i>
                          <span className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                            नागरिकता प्रमाणपत्र (दुवै भाग) *
                          </span>
                          <span className="text-[11px] text-slate-500 mb-3">Citizenship scan copy</span>
                          <label className="cursor-pointer bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 px-3 py-1.5 rounded text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition shadow-sm">
                            {filesUploaded.citizenship ? "✓ फाइल छनोट भयो" : "कागजात छान्नुहोस्"}
                            <input
                              type="file"
                              className="hidden"
                              onChange={() => setFilesUploaded({ ...filesUploaded, citizenship: true })}
                            />
                          </label>
                        </div>

                        {/* Doc 2: Lalpurja or House Tax */}
                        <div className="border border-dashed border-slate-300 dark:border-gov-borderDark p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center">
                          <i data-lucide="home" className="w-8 h-8 text-gov-crimson mb-2"></i>
                          <span className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                            जग्गाधनी दर्ता प्रमाणपुर्जा / कर रसिद *
                          </span>
                          <span className="text-[11px] text-slate-500 mb-3">Land Deed (Lalpurja) / Tax Receipt</span>
                          <label className="cursor-pointer bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 px-3 py-1.5 rounded text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition shadow-sm">
                            {filesUploaded.lalpurja ? "✓ फाइल छनोट भयो" : "कागजात छान्नुहोस्"}
                            <input
                              type="file"
                              className="hidden"
                              onChange={() => setFilesUploaded({ ...filesUploaded, lalpurja: true })}
                            />
                          </label>
                        </div>

                        {/* Doc 3: Photo */}
                        <div className="border border-dashed border-slate-300 dark:border-gov-borderDark p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center">
                          <i data-lucide="camera" className="w-8 h-8 text-emerald-600 mb-2"></i>
                          <span className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                            हालसालै खिचिएको पासपोर्ट फोटो *
                          </span>
                          <span className="text-[11px] text-slate-500 mb-3">Passport Photo (PP Size)</span>
                          <label className="cursor-pointer bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 px-3 py-1.5 rounded text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition shadow-sm">
                            {filesUploaded.photo ? "✓ फाइल छनोट भयो" : "कागजात छान्नुहोस्"}
                            <input
                              type="file"
                              className="hidden"
                              onChange={() => setFilesUploaded({ ...filesUploaded, photo: true })}
                            />
                          </label>
                        </div>

                        {/* Doc 4: Additional Document */}
                        <div className="border border-dashed border-slate-300 dark:border-gov-borderDark p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center">
                          <i data-lucide="folder-up" className="w-8 h-8 text-amber-500 mb-2"></i>
                          <span className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                            थप प्रमाण / सर्जमिन मुचुल्का (ऐच्छिक)
                          </span>
                          <span className="text-[11px] text-slate-500 mb-3">Supporting Documents</span>
                          <label className="cursor-pointer bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 px-3 py-1.5 rounded text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition shadow-sm">
                            {filesUploaded.recommendationDoc ? "✓ फाइल छनोट भयो" : "कागजात छान्नुहोस्"}
                            <input
                              type="file"
                              className="hidden"
                              onChange={() => setFilesUploaded({ ...filesUploaded, recommendationDoc: true })}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: REVIEW & SIFARIS FEE CALCULATION */}
                  {step === 4 && (
                    <div className="space-y-4">
                      <div className="border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">
                          ४. आवेदन सारांश समीक्षा तथा दस्तुर भुक्तानी
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          निवेदन पेश गर्नुपूर्व सबै विवरण सही रहेको सुनिश्चित गर्नुहोस्।
                        </p>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-gov-borderDark text-xs space-y-2.5">
                        <div className="flex justify-between border-b pb-2 dark:border-slate-800">
                          <span className="text-slate-500 dark:text-slate-400">सिफारिस शीर्षक:</span>
                          <span className="font-bold text-slate-900 dark:text-white">{selectedService.titleNe}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2 dark:border-slate-800">
                          <span className="text-slate-500 dark:text-slate-400">निवेदकको नाम:</span>
                          <span className="font-bold text-slate-900 dark:text-white">
                            {formCitizen.fullNameNe || "सुरज केसी"} ({formCitizen.fullNameEn || "Suraj KC"})
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2 dark:border-slate-800">
                          <span className="text-slate-500 dark:text-slate-400">नागरिकता नं. / जिल्ला:</span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            {formCitizen.citizenshipNo || "२७-०१-७५-००१२३"} ({formCitizen.issuedDist})
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2 dark:border-slate-800">
                          <span className="text-slate-500 dark:text-slate-400">सम्पर्क मोबाइल:</span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            {formCitizen.mobileNo || "९८४१२३४५६७"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">ठेगाना:</span>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            काठमाडौँ महानगरपालिका वडा नं. ३२, {formCitizen.tole || "कोटेश्वर"}
                          </span>
                        </div>
                      </div>

                      {/* Sifaris Fee Breakdown Card */}
                      <div className="bg-amber-50/80 dark:bg-amber-950/40 p-4 rounded-lg border border-amber-200 dark:border-amber-900 text-xs">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">सिफारिस सरकारी दस्तुर:</span>
                          <span className="font-bold text-slate-900 dark:text-white font-mono">{selectedService.feeNe}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">डिजिटल प्रमाणीकरण शुल्क:</span>
                          <span className="font-bold text-slate-900 dark:text-white font-mono">रु. ०/- (निःशुल्क)</span>
                        </div>
                        <div className="border-t border-amber-200 dark:border-amber-900 pt-2 flex justify-between items-center text-sm font-bold text-gov-crimson">
                          <span>कुल बुझाउनुपर्ने रकम (Total):</span>
                          <span>{selectedService.feeNe}</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 pt-2 text-xs text-slate-600 dark:text-slate-300">
                        <input type="checkbox" defaultChecked id="agreeTerms" className="mt-0.5 rounded text-gov-blue" />
                        <label htmlFor="agreeTerms" className="cursor-pointer">
                          म घोषणा गर्दछु कि माथि उल्लिखित सम्पूर्ण विवरण तथा कागजातहरू सत्य-तथ्य छन्। झुट्ठा व्यहोरा प्रमाणित भएमा कानून बमोजिम सजाय भोग्न तयार छु।
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center space-x-1"
                      >
                        <i data-lucide="chevron-left" className="w-4 h-4"></i>
                        <span>{t.stepPrev}</span>
                      </button>
                    ) : (
                      <div></div>
                    )}

                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step + 1)}
                        className="px-5 py-2 bg-gov-blue hover:bg-gov-bluedark text-white rounded text-xs font-bold transition flex items-center space-x-1 shadow"
                      >
                        <span>{t.stepNext}</span>
                        <i data-lucide="chevron-right" className="w-4 h-4"></i>
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={submitting}
                        onClick={handleFinalSubmit}
                        className="px-6 py-2.5 bg-gov-crimson hover:bg-gov-crimsondark text-white rounded text-xs font-bold transition flex items-center space-x-2 shadow-lg disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <i data-lucide="loader-2" className="w-4 h-4 animate-spin"></i>
                            <span>निवेदन पेश हुँदैछ...</span>
                          </>
                        ) : (
                          <>
                            <i data-lucide="send" className="w-4 h-4"></i>
                            <span>{t.submitApp}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL: OFFICIAL BILINGUAL SIFARIS LETTER PREVIEW & PRINT */}
      {certModalOpen && activeCertificateData && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 no-print-backdrop">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[94vh] flex flex-col overflow-hidden animate-fade text-slate-900 border border-slate-300">
            {/* Top Modal Controls (Hidden in Print) */}
            <div className="no-print bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <i data-lucide="file-check" className="w-5 h-5 text-emerald-400"></i>
                <span className="font-bold text-sm tracking-wide">
                  आधिकारिक डिजिटल सिफारिस पत्र (Official Verified Certificate)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="bg-gov-crimson hover:bg-gov-crimsondark text-white font-bold text-xs px-3.5 py-1.5 rounded flex items-center space-x-1.5 shadow transition"
                >
                  <i data-lucide="printer" className="w-4 h-4"></i>
                  <span>{t.printCertificate}</span>
                </button>
                <button
                  onClick={() => setCertModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded"
                >
                  <i data-lucide="x" className="w-5 h-5"></i>
                </button>
              </div>
            </div>

            {/* Printable Sifaris Area (Exact Official Nepal Ward Format) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 sifaris-letter-bg print-area bg-white text-black font-mukta relative">
              {/* Subtle Nepal Emblem Watermark in Center */}
              <div className="sifaris-watermark flex items-center justify-center">
                <svg className="w-full h-full text-slate-400" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 8C35 8 20 20 20 38C20 62 50 92 50 92C50 92 80 62 80 38C80 20 65 8 50 8ZM50 24C53 24 56 26.5 56 29.5C56 32.5 53 35 50 35C47 35 44 32.5 44 29.5C44 26.5 47 24 50 24ZM42 42C44 40 48 39 50 39C52 39 56 40 58 42C61 45 61 50 59 54L55 62C54 64 52 65 50 65C48 65 46 64 45 62L41 54C39 50 39 45 42 42Z" />
                </svg>
              </div>

              {/* Official Ward Header */}
              <div className="border-b-2 border-gov-crimson pb-4 mb-6 relative">
                <div className="flex items-start justify-between">
                  {/* Left Nepal Emblem */}
                  <div className="w-24 flex-shrink-0">
                    <svg className="w-20 h-20 text-gov-crimson" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M50 8C35 8 20 20 20 38C20 62 50 92 50 92C50 92 80 62 80 38C80 20 65 8 50 8ZM50 24C53 24 56 26.5 56 29.5C56 32.5 53 35 50 35C47 35 44 32.5 44 29.5C44 26.5 47 24 50 24ZM42 42C44 40 48 39 50 39C52 39 56 40 58 42C61 45 61 50 59 54L55 62C54 64 52 65 50 65C48 65 46 64 45 62L41 54C39 50 39 45 42 42Z" />
                      <path d="M28 25L32 30L26 34L30 39L22 41L25 48C16 40 18 28 28 25ZM72 25L68 30L74 34L70 39L78 41L75 48C84 40 82 28 72 25Z" opacity="0.7" />
                    </svg>
                  </div>

                  {/* Center Text Titles */}
                  <div className="text-center flex-1 px-2">
                    <h4 className="text-xs font-bold text-gov-crimson tracking-wider">
                      नेपाल सरकार / Government of Nepal
                    </h4>
                    <h2 className="text-xl sm:text-2xl font-black text-gov-blue tracking-tight leading-snug">
                      काठमाडौँ महानगरपालिका
                    </h2>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800">
                      ३२ नं. वडा कार्यालय, कोटेश्वर
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      बागमती प्रदेश, नेपाल | Bagmati Province, Nepal
                    </p>
                  </div>

                  {/* Right QR Code Block */}
                  <div className="w-24 flex flex-col items-center flex-shrink-0">
                    <div id="qrcode-container" className="bg-white p-1 border border-slate-300 rounded shadow-sm"></div>
                    <span className="text-[9px] font-mono font-bold text-gov-blue mt-1">
                      {activeCertificateData.id}
                    </span>
                  </div>
                </div>

                {/* Dispatch / Ref Details Row */}
                <div className="mt-4 flex justify-between text-xs font-semibold text-slate-800 border-t border-slate-200 pt-2">
                  <div>
                    <span>{t.refNo}: </span>
                    <span className="font-mono">२०८१/०८२</span>
                    <br />
                    <span>{t.dispatchNo}: </span>
                    <span className="font-mono font-bold">
                      {activeCertificateData.certificateNo || "वडा३२/ना.प्र./२०८१-४९२"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span>{t.date}: </span>
                    <span className="font-mono font-bold">{activeCertificateData.approvedDateBs || "२०८१/०७/१४"} वि.सं.</span>
                    <br />
                    <span className="text-slate-500 font-normal font-mono">({activeCertificateData.approvedDateAd || "2024-10-30"} A.D.)</span>
                  </div>
                </div>
              </div>

              {/* Recommendation Subject Banner */}
              <div className="text-center my-6">
                <h3 className="text-lg sm:text-xl font-extrabold text-gov-blue underline decoration-gov-crimson underline-offset-4 tracking-wide uppercase">
                  विषय: {activeCertificateData.serviceNe}
                </h3>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                  SUB: {activeCertificateData.serviceEn}
                </p>
              </div>

              {/* Salutation */}
              <div className="text-sm font-bold text-slate-900 mb-4">
                {t.toWhom}
              </div>

              {/* Letter Legal Body Paragraph */}
              <div className="text-sm leading-relaxed text-slate-900 space-y-3.5 text-justify indent-8">
                <p>
                  प्रस्तुत विषयमा काठमाडौँ महानगरपालिका वडा नं. ३२, {activeCertificateData.tole} स्थायी ठेगाना भएका
                  नागरिकता प्रमाणपत्र नं. <strong className="font-mono">{activeCertificateData.citizenshipNo}</strong> का
                  वाहक श्री <strong>{activeCertificateData.applicantNameNe}</strong> ({activeCertificateData.applicantNameEn}) ले यस वडा कार्यालयमा पेश गर्नुभएको
                  निवेदन तथा संलग्न प्रमाण कागजात, सर्जमिन मुचुल्का छानबिन गर्दा व्यहोरा मनासिब देखिएको छ।
                </p>
                <p>
                  तसर्थ, स्थानीय सरकार सञ्चालन ऐन, २०७४ को परिच्छेद ३, दफा १२ (२) बमोजिम निवेदकको माग अनुसार देहाय बमोजिमको विवरण प्रमाणित गरी यो सिफारिस पत्र जारी गरिएको छ।
                </p>
              </div>

              {/* Dynamic Family Table if Nata Pramanit */}
              {activeCertificateData.members && activeCertificateData.members.length > 0 && (
                <div className="my-6 overflow-x-auto">
                  <table className="w-full text-xs border-collapse border border-slate-400 text-left">
                    <thead>
                      <tr className="bg-slate-100 font-bold text-slate-900">
                        <th className="border border-slate-400 p-2 text-center">क्र.सं.</th>
                        <th className="border border-slate-400 p-2">परिवारका सदस्यको नाम</th>
                        <th className="border border-slate-400 p-2">निवेदकसँगको नाता</th>
                        <th className="border border-slate-400 p-2 text-center">उमेर</th>
                        <th className="border border-slate-400 p-2">नागरिकता / जन्मदर्ता नं.</th>
                        <th className="border border-slate-400 p-2 text-center">कैफियत</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeCertificateData.members.map((item, mIdx) => (
                        <tr key={mIdx}>
                          <td className="border border-slate-400 p-2 text-center font-mono">{mIdx + 1}</td>
                          <td className="border border-slate-400 p-2 font-bold">{item.name}</td>
                          <td className="border border-slate-400 p-2">{item.relation}</td>
                          <td className="border border-slate-400 p-2 text-center font-mono">{item.age}</td>
                          <td className="border border-slate-400 p-2 font-mono">{item.citizenNo}</td>
                          <td className="border border-slate-400 p-2 text-center text-emerald-700 font-bold">प्रमाणित</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Official Seal Stamp and Signatures Section */}
              <div className="mt-12 pt-6 grid grid-cols-3 items-end">
                {/* Ward Secretary */}
                <div className="text-center text-xs">
                  <div className="h-12 flex items-end justify-center mb-1 text-slate-400 italic font-mono text-[11px]">
                    [Digitally Signed]
                  </div>
                  <div className="border-t border-slate-600 pt-1 font-bold">
                    दिनेश राज पन्त
                    <span className="block font-normal text-[11px] text-slate-600">{t.wardSecretary}</span>
                  </div>
                </div>

                {/* Center Ward Stamp */}
                <div className="flex justify-center">
                  <div className="gov-stamp w-28 h-28 p-2">
                    <span className="text-[9px] font-bold tracking-tight">काठमाडौँ महानगरपालिका</span>
                    <span className="text-[11px] font-extrabold">वडा नं. ३२</span>
                    <span className="text-[8px] font-semibold">कार्यालयको छाप</span>
                    <span className="text-[7px] font-mono mt-0.5">ESTD. 2032</span>
                  </div>
                </div>

                {/* Ward Chairperson */}
                <div className="text-center text-xs">
                  <div className="h-12 flex items-end justify-center mb-1 text-gov-crimson font-mono text-[11px] font-bold">
                    ✓ E-Signed 2081/07/14
                  </div>
                  <div className="border-t border-slate-600 pt-1 font-bold text-gov-blue">
                    नवराज पराजुली
                    <span className="block font-normal text-[11px] text-slate-600">{t.wardChairperson}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Verification Note & Hash */}
              <div className="mt-10 border-t border-slate-200 pt-3 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 gap-2">
                <p className="max-w-xl text-justify">
                  {t.digitalVerificationNote}
                </p>
                <div className="font-mono text-right">
                  SHA256: 9e8a71fc82b0...33a2<br />
                  Status: VERIFIED & ACTIVE
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-gov-bluedark text-white border-t border-gov-blue mt-auto transition-colors no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div>
              <div className="flex items-center space-x-2 text-white font-bold text-sm mb-2">
                <span className="w-3 h-3 bg-gov-crimson rounded-full"></span>
                <span>काठमाडौँ महानगरपालिका - वडा नं. ३२</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                कोटेश्वर, काठमाडौँ, बागमती प्रदेश, नेपाल।<br />
                इमेल: ward32@kathmandu.gov.np | फोन: ०१-४६००१२३
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white text-sm mb-2">नागरिक सहायता कक्ष (Citizen Helpdesk)</h5>
              <p className="leading-relaxed">
                कार्यालय समय: आइतबार - बिहीबार: १०:०० देखि ५:०० सम्म<br />
                शुक्रबार: १०:०० देखि ३:०० सम्म (सार्वजनिक बिदा बाहेक)<br />
                टोल फ्री नं: १६६००१४५०००
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white text-sm mb-2">कानूनी तथा प्राविधिक आधार</h5>
              <p className="leading-relaxed">
                स्थानीय सरकार सञ्चालन ऐन २०७४ को दफा १२ तथा विद्युतीय कारोबार ऐन २०६३ बमोजिम प्रमाणीकरण प्रणाली लागू गरिएको।
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-blue-900/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
            <p>{t.footerCopyright}</p>
            <p className="font-mono">v2.4.0-prod | Nepal Gov Design System</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Render React root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
