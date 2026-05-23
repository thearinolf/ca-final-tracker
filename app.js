// Firebase Initialization
const firebaseConfig = {
  apiKey: "AIzaSyBcx3yRO8eXk7L8ehLuIsOQuLYM0teU4_w",
  authDomain: "ca-final-tracker-bf7e6.firebaseapp.com",
  databaseURL: "https://ca-final-tracker-bf7e6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ca-final-tracker-bf7e6",
  storageBucket: "ca-final-tracker-bf7e6.firebasestorage.app",
  messagingSenderId: "1040569064589",
  appId: "1:1040569064589:web:243e458df3bcd785eb96c4"
};
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = typeof firebase !== 'undefined' ? firebase.database() : null;
const auth = typeof firebase !== 'undefined' ? firebase.auth() : null;

window.syncTimeout = null;
function showSyncing() {
    const el = document.getElementById('sync-status');
    if(el) {
        el.style.opacity = '1';
        clearTimeout(window.syncTimeout);
        window.syncTimeout = setTimeout(() => {
            el.style.opacity = '0';
        }, 1500);
    }
}


function getDirectPdfLinksHtml(subjectName, chapterName, index) {
    const defaultHtml = `<a href="https://boslive.icai.org/study_material_new_paper_details.php?c=final&language=English&year=Applicable%20for%20May%202026%20Exam%20Onwards" target="_blank" title="Open Official Study Material PDF" style="color: var(--accent-blue); text-decoration: none; display: inline-flex; align-items: center; transition: all 0.2s ease; padding: 2px 6px; background: rgba(59, 130, 246, 0.1); border-radius: 4px; border: 1px solid rgba(59, 130, 246, 0.2);">
        <i class='bx bxs-file-pdf' style="font-size: 1.1rem; margin-right: 4px;"></i> <span style="font-size: 0.7rem; font-weight: bold; text-transform: uppercase;">PDF</span>
    </a>`;

    if (typeof ICAI_LINKS === 'undefined') return defaultHtml;
    let subjectKey = Object.keys(ICAI_LINKS).find(k => k.toLowerCase().includes(subjectName.toLowerCase()));
    if (!subjectKey) return defaultHtml;
    let chapters = ICAI_LINKS[subjectKey];
    if (!chapters) return defaultHtml;
    
    let searchName = chapterName.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (let ch of chapters) {
        if (ch.name) {
            let cleanChName = ch.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (cleanChName.includes(searchName) || searchName.includes(cleanChName)) {
                if (ch.units && ch.units.length > 0) {
                    let html = '';
                    ch.units.forEach((unit, uIdx) => {
                        let unitNum = uIdx + 1;
                        let linkText = `Ch ${index + 1} U ${unitNum}`;
                        html += `<a href="${unit.url}" target="_blank" title="${unit.name.replace(/"/g, '&quot;')}" style="color: var(--accent-blue); text-decoration: none; display: inline-flex; align-items: center; transition: all 0.2s ease; padding: 2px 6px; background: rgba(59, 130, 246, 0.1); border-radius: 4px; border: 1px solid rgba(59, 130, 246, 0.2); margin-right: 4px; margin-top: 4px;">
                            <i class='bx bxs-file-pdf' style="font-size: 1.1rem; margin-right: 4px;"></i> <span style="font-size: 0.7rem; font-weight: bold; text-transform: uppercase; white-space: nowrap;">${linkText}</span>
                        </a>`;
                    });
                    return html;
                }
                if (ch.url) {
                    return `<a href="${ch.url}" target="_blank" title="Open Official Study Material PDF" style="color: var(--accent-blue); text-decoration: none; display: inline-flex; align-items: center; transition: all 0.2s ease; padding: 2px 6px; background: rgba(59, 130, 246, 0.1); border-radius: 4px; border: 1px solid rgba(59, 130, 246, 0.2); margin-top: 4px;">
                        <i class='bx bxs-file-pdf' style="font-size: 1.1rem; margin-right: 4px;"></i> <span style="font-size: 0.7rem; font-weight: bold; text-transform: uppercase; white-space: nowrap;">PDF</span>
                    </a>`;
                }
            }
        }
    }
    return defaultHtml;
}
const ICAI_LINKS = {
  "Paper -1 - Financial Reporting (Applicable for May 2026 Exam Onwards)": [
    {
      "name": "Initial Pages",
      "url": "https://resource.cdn.icai.org/87860bos-290825-final-ip.pdf"
    },
    {
      "name": "Chapter 9: Ind AS 115 Revenue from Contracts with Customers",
      "url": "https://resource.cdn.icai.org/87859bos-290825-final-ch9.pdf"
    },
    {
      "name": "Chapter 10: Other Indian Accounting Standards",
      "units": [
        {
          "name": "Unit 1: Ind AS 41 Agriculture",
          "url": "https://resource.cdn.icai.org/87861bos-290825-final-ch10-ui.pdf"
        },
        {
          "name": "Unit 2: Ind AS 20 Accounting for Government Grants and Disclosure of Government Assistance",
          "url": "https://resource.cdn.icai.org/87862bos-290825-final-ch10-u2.pdf"
        },
        {
          "name": "Unit 3: Ind AS 102 Share Based Payment",
          "url": "https://resource.cdn.icai.org/87863bos-290825-final-ch10-u3.pdf"
        }
      ]
    },
    {
      "name": "Chapter 11: Accounting and Reporting of Financial Instruments",
      "units": [
        {
          "name": "Unit 1: Financial Instruments: Scope and Definitions",
          "url": "https://resource.cdn.icai.org/87864bos-290825-final-ch11-ui.pdf"
        },
        {
          "name": "Unit 2: Classification and Measurement of Financial Assets and Financial Liabilities",
          "url": "https://resource.cdn.icai.org/87865bos-290825-final-ch11-u2.pdf"
        },
        {
          "name": "Unit 3: Financial Instruments: Equity and Financial Liabilities",
          "url": "https://resource.cdn.icai.org/87866bos-290825-final-ch11-u3.pdf"
        },
        {
          "name": "Unit 4 : Derivatives and Embedded Derivatives",
          "url": "https://resource.cdn.icai.org/87867bos-290825-final-ch11-u4.pdf"
        },
        {
          "name": "Unit 5: Recognition and Derecognition of Financial Instruments",
          "url": "https://resource.cdn.icai.org/87868bos-290825-final-ch11-u5.pdf"
        },
        {
          "name": "Unit 6: Hedge Accounting",
          "url": "https://resource.cdn.icai.org/87869bos-290825-final-ch11-u6.pdf"
        },
        {
          "name": "Unit 7: Disclosures",
          "url": "https://resource.cdn.icai.org/87870bos-290825-final-ch11-u7.pdf"
        }
      ]
    },
    {
      "name": "Comprehensive Illustrations",
      "url": "https://resource.cdn.icai.org/87871bos-290825-final-comp.pdf"
    },
    {
      "name": "Test Your Knowledge",
      "url": "https://resource.cdn.icai.org/87872bos-290825-final-tyk.pdf"
    },
    {
      "name": "Practice Questions",
      "url": "https://resource.cdn.icai.org/87873bos-290825-final-pq.pdf"
    },
    {
      "name": "Initial Pages",
      "url": "https://resource.cdn.icai.org/87810bos-280825-final-ip.pdf"
    },
    {
      "name": "Chapter 1: Introduction to Indian Accounting Standards",
      "url": "https://resource.cdn.icai.org/87811bos-280825-final-ch1.pdf"
    },
    {
      "name": "Chapter 2: Conceptual Framework for Financial Reporting under Indian Accounting Standards (Ind AS)",
      "url": "https://resource.cdn.icai.org/87812bos-280825-final-ch2.pdf"
    },
    {
      "name": "Chapter 3: Ind AS on Presentation of General Purpose Financial Statements",
      "units": [
        {
          "name": "Unit 1: Ind AS 1 Presentation of Financial Statements",
          "url": "https://resource.cdn.icai.org/87813bos-280825-final-ch3-u1.pdf"
        },
        {
          "name": "Unit 2: Ind AS 34 Interim Financial Reporting",
          "url": "https://resource.cdn.icai.org/87814bos-280825-final-ch3-u2.pdf"
        },
        {
          "name": "Unit 3: Ind AS 7 Statement of Cash Flows",
          "url": "https://resource.cdn.icai.org/87815bos-280825-final-ch3-u3.pdf"
        }
      ]
    },
    {
      "name": "Chapter 4: Ind AS on Measurement based on Accounting Policies",
      "units": [
        {
          "name": "Unit 1: Ind AS 8 Accounting Policies, Changes in Accounting Estimates and Errors",
          "url": "https://resource.cdn.icai.org/87816bos-280825-final-ch4-u1.pdf"
        },
        {
          "name": "Unit 2: Ind AS 10 Events after the Reporting Period",
          "url": "https://resource.cdn.icai.org/87817bos-280825-final-ch4-u2.pdf"
        },
        {
          "name": "Unit 3: Ind AS 113 Fair Value Measurement",
          "url": "https://resource.cdn.icai.org/87818bos-280825-final-ch4-u3.pdf"
        }
      ]
    },
    {
      "name": "Annexure : Division II of Schedule III to the Companies Act, 2013",
      "url": "https://resource.cdn.icai.org/87819bos-280824-annex-final.pdf"
    },
    {
      "name": "Practice Questions",
      "url": "https://resource.cdn.icai.org/87820bos-280824-pp-final.pdf"
    },
    {
      "name": "Initial Pages",
      "url": "https://resource.cdn.icai.org/87832bos-280825-final-ip-m3.pdf"
    },
    {
      "name": "Chapter 6: Ind AS on Liabilities of the Financial Statements",
      "units": [
        {
          "name": "Unit 1: Ind AS 19 Employee Benefits",
          "url": "https://resource.cdn.icai.org/87833bos-280825-final-ch6-u1.pdf"
        },
        {
          "name": "Unit 2: Ind AS 37 Provisions, Contingent Liabilities and Contingent Assets",
          "url": "https://resource.cdn.icai.org/87834bos-280825-final-ch6-u2.pdf"
        }
      ]
    },
    {
      "name": "Chapter 7: Ind AS on Items impacting the Financial Statements",
      "units": [
        {
          "name": "Unit 1: Ind AS 12 Income Taxes",
          "url": "https://resource.cdn.icai.org/87835bos-280825-final-ch7-u1.pdf"
        },
        {
          "name": "Unit 2: Ind AS 21 The Effects of Changes in Foreign Exchange Rates",
          "url": "https://resource.cdn.icai.org/87836bos-280825-final-ch7-u2.pdf"
        }
      ]
    },
    {
      "name": "Chapter 8: Ind AS on Disclosures in the Financial Statements",
      "units": [
        {
          "name": "Unit 1: Ind AS 24 Related Party Disclosures",
          "url": "https://resource.cdn.icai.org/87837bos-280825-final-ch8-u1.pdf"
        },
        {
          "name": "Unit 2: Ind AS 33 Earnings per Share",
          "url": "https://resource.cdn.icai.org/87838bos-280825-final-ch8-u2.pdf"
        },
        {
          "name": "Unit 3: Ind AS 108 Operating Segments",
          "url": "https://resource.cdn.icai.org/87839bos-280825-final-ch8-u3.pdf"
        }
      ]
    },
    {
      "name": "Practice Question",
      "url": "https://resource.cdn.icai.org/87840bos-280825-final-pq-m3.pdf"
    },
    {
      "name": "Ind AS Puzzlers: Test Your Accounting Acumen",
      "url": "https://resource.cdn.icai.org/87841bos-280825-final-indas-m3.pdf"
    },
    {
      "name": "Initial Pages",
      "url": "https://resource.cdn.icai.org/87874bos-290825-final-ip5.pdf"
    },
    {
      "name": "Chapter 12: Ind AS 103 Business Combinations",
      "url": "https://resource.cdn.icai.org/87875bos-290825-ch12-u1.pdf"
    },
    {
      "name": "Chapter 13: Consolidated and Separate Financial Statements of Group Entities",
      "units": [
        {
          "name": "Unit 1 : Introduction to Consolidated and Separate Financial Statements",
          "url": "https://resource.cdn.icai.org/87876bos-290825-ch13-u1.pdf"
        },
        {
          "name": "Unit 2 : Important Definitions",
          "url": "https://resource.cdn.icai.org/87877bos-290825-ch13-u2.pdf"
        },
        {
          "name": "Unit 3 : Consolidated Financial Statements",
          "url": "https://resource.cdn.icai.org/87878bos-290825-ch13-u3.pdf"
        },
        {
          "name": "Unit 4 : Ind AS 110: Consolidation Procedure for Subsidiaries",
          "url": "https://resource.cdn.icai.org/87879bos-290825-ch13-u4.pdf"
        },
        {
          "name": "Unit 5 : Ind AS 111 Joint Arrangements",
          "url": "https://resource.cdn.icai.org/87880bos-290825-ch13-u5.pdf"
        },
        {
          "name": "Unit 6 : Ind AS 28 Investments in Associates and Joint Ventures",
          "url": "https://resource.cdn.icai.org/87881bos-290825-ch13-u6.pdf"
        },
        {
          "name": "Unit 7 : Ind AS 27 Separate Financial Statements",
          "url": "https://resource.cdn.icai.org/87882bos-290825-ch13-u7.pdf"
        },
        {
          "name": "Unit 8 : Disclosures",
          "url": "https://resource.cdn.icai.org/87883bos-290825-ch13-u8.pdf"
        }
      ]
    },
    {
      "name": "Chapter 14: Ind AS 101 First-time Adoption of Ind AS",
      "url": "https://resource.cdn.icai.org/87884bos-290825-ch14.pdf"
    },
    {
      "name": "Chapter 15: Analysis of Financial Statements",
      "url": "https://resource.cdn.icai.org/87885bos-290825-ch15.pdf"
    },
    {
      "name": "Chapter 16: Professional and Ethical Duty of a Chartered Accountant",
      "url": "https://resource.cdn.icai.org/87886bos-290825-ch16.pdf"
    },
    {
      "name": "Chapter 17: Accounting and Technology",
      "url": "https://resource.cdn.icai.org/87887bos-290825-ch17.pdf"
    },
    {
      "name": "Practice Questions",
      "url": "https://resource.cdn.icai.org/87889bos-290825-final-pq-m5.pdf"
    },
    {
      "name": "Ind AS Puzzlers: Test Your Accounting Acumen",
      "url": "https://resource.cdn.icai.org/87888bos-290825-final-iap.pdf"
    },
    {
      "name": "Initial Pages",
      "url": "https://resource.cdn.icai.org/87821bos-280825-final-ip-m2.pdf"
    },
    {
      "name": "Chapter 5: Ind AS on Assets of the Financial Statements",
      "units": [
        {
          "name": "Unit 1: Ind AS 2 Inventories",
          "url": "https://resource.cdn.icai.org/87822bos-280825-final-ch5-u1.pdf"
        },
        {
          "name": "Unit 2: Ind AS 16 Property, Plant and Equipment",
          "url": "https://resource.cdn.icai.org/87823bos-280825-final-ch5-u2.pdf"
        },
        {
          "name": "Unit 3: Ind AS 23 Borrowing Costs",
          "url": "https://resource.cdn.icai.org/87824bos-280825-final-ch5-u3.pdf"
        },
        {
          "name": "Unit 4: Ind AS 36 Impairment of Assets",
          "url": "https://resource.cdn.icai.org/87825bos-280825-final-ch5-u4.pdf"
        },
        {
          "name": "Unit 5: Ind AS 38 Intangible Assets",
          "url": "https://resource.cdn.icai.org/87826bos-280825-final-ch5-u5.pdf"
        },
        {
          "name": "Unit 6: Ind AS 40 Investment Property",
          "url": "https://resource.cdn.icai.org/87827bos-280825-final-ch5-u6.pdf"
        },
        {
          "name": "Unit 7: Ind AS 105 Non-current Assets Held for Sale and Discontinued Operations",
          "url": "https://resource.cdn.icai.org/87828bos-280825-final-ch5-u7.pdf"
        },
        {
          "name": "Unit 8: Ind AS 116 Leases",
          "url": "https://resource.cdn.icai.org/87829bos-280825-final-ch5-u8.pdf"
        }
      ]
    },
    {
      "name": "Practice Questions",
      "url": "https://resource.cdn.icai.org/87830bos-280825-final-pq.pdf"
    },
    {
      "name": "Ind AS Puzzlers: Test Your Accounting Acumen",
      "url": "https://resource.cdn.icai.org/87831bos-280825-final-indas.pdf"
    }
  ],
  "Paper-2: Advanced Financial Management (Applicable for May 2026 Exam Onwards)": [
    {
      "name": "Initial Pages",
      "url": "https://resource.cdn.icai.org/87857bos-aps2163-ip.pdf"
    },
    {
      "name": "Chapter 1: Financial Policy and Corporate Strategy",
      "url": "https://resource.cdn.icai.org/87842bos-aps2163-ch1.pdf"
    },
    {
      "name": "Chapter 2: Risk Management",
      "url": "https://resource.cdn.icai.org/87843bos-aps2163-ch2.pdf"
    },
    {
      "name": "Chapter 3: Advanced Capital Budgeting Decision",
      "url": "https://resource.cdn.icai.org/87844bos-aps2163-ch3.pdf"
    },
    {
      "name": "Chapter 4: Security Analysis",
      "url": "https://resource.cdn.icai.org/87845bos-aps2163-ch4.pdf"
    },
    {
      "name": "Chapter 5: Security Valuation",
      "url": "https://resource.cdn.icai.org/87846bos-aps2163-ch5.pdf"
    },
    {
      "name": "Chapter 6: Portfolio Management",
      "url": "https://resource.cdn.icai.org/87847bos-aps2163-ch6.pdf"
    },
    {
      "name": "Chapter 7: Securitization",
      "url": "https://resource.cdn.icai.org/87848bos-aps2163-ch7.pdf"
    },
    {
      "name": "Chapter 8: Mutual Funds",
      "url": "https://resource.cdn.icai.org/87849bos-aps2163-ch8.pdf"
    },
    {
      "name": "Chapter 9: Derivatives Analysis and Valuation",
      "url": "https://resource.cdn.icai.org/87850bos-aps2163-ch9.pdf"
    },
    {
      "name": "Chapter 10: Foreign Exchange Exposure and Risk Management",
      "url": "https://resource.cdn.icai.org/87851bos-aps2163-ch10.pdf"
    },
    {
      "name": "Chapter 11: International Financial Management",
      "url": "https://resource.cdn.icai.org/87852bos-aps2163-ch11.pdf"
    },
    {
      "name": "Chapter 12: Interest Rate Risk Management",
      "url": "https://resource.cdn.icai.org/87853bos-aps2163-ch12.pdf"
    },
    {
      "name": "Chapter 13: Business Valuation",
      "url": "https://resource.cdn.icai.org/87854bos-aps2163-ch13.pdf"
    },
    {
      "name": "Chapter 14: Mergers, Acquisitions and Corporate Restructuring",
      "url": "https://resource.cdn.icai.org/87855bos-aps2163-ch14.pdf"
    },
    {
      "name": "Chapter 15: Startup Finance",
      "url": "https://resource.cdn.icai.org/87856bos-aps2163-ch15.pdf"
    },
    {
      "name": "Appendix",
      "url": "https://resource.cdn.icai.org/87858bos-aps2163-appendix.pdf"
    }
  ],
  "Paper-3: Advanced Auditing, Assurance and Professional Ethics (Applicable for May 2026 Exam)": [
    {
      "name": "Initial Pages",
      "url": "https://resource.cdn.icai.org/87912bos-aps2168-m2-ip.pdf"
    },
    {
      "name": "Chapter 8: Specialised Areas",
      "url": "https://resource.cdn.icai.org/87914bos-aps2168-ch8.pdf"
    },
    {
      "name": "Chapter 9: Related Services",
      "url": "https://resource.cdn.icai.org/87915bos-aps2168-ch9.pdf"
    },
    {
      "name": "Chapter 10: Review of Financial Information",
      "url": "https://resource.cdn.icai.org/87916bos-aps2168-ch10.pdf"
    },
    {
      "name": "Chapter 11: Prospective Financial Information and Other Assurance Services",
      "url": "https://resource.cdn.icai.org/87917bos-aps2168-ch11.pdf"
    },
    {
      "name": "Chapter 12: Digital Auditing & Assurance",
      "url": "https://resource.cdn.icai.org/87918bos-aps2168-ch12.pdf"
    },
    {
      "name": "Chapter 13: Group Audits",
      "url": "https://resource.cdn.icai.org/87919bos-aps2168-ch13.pdf"
    },
    {
      "name": "Chapter 14: Special Features of Audit of Banks & Non-Banking Financial Companies",
      "units": [
        {
          "name": "Unit-1",
          "url": "https://resource.cdn.icai.org/87920bos-aps2168-ch14u1.pdf"
        },
        {
          "name": "Unit-2",
          "url": "https://resource.cdn.icai.org/87921bos-aps2168-ch14u2.pdf"
        }
      ]
    },
    {
      "name": "Initial Pages",
      "url": "https://resource.cdn.icai.org/87911bos-aps2168-m1-ip.pdf"
    },
    {
      "name": "Chapter 1: Quality Control",
      "url": "https://resource.cdn.icai.org/87904bos-aps2168-ch1.pdf"
    },
    {
      "name": "Chapter 2: General Auditing Principles and Auditors Responsibilities",
      "url": "https://resource.cdn.icai.org/87905bos-aps2168-ch2.pdf"
    },
    {
      "name": "Chapter 3: Audit Planning, Strategy and Execution",
      "url": "https://resource.cdn.icai.org/87906bos-aps2168-ch3.pdf"
    },
    {
      "name": "Chapter 4: Materiality, Risk Assessment and Internal Control",
      "url": "https://resource.cdn.icai.org/87907bos-aps2168-ch4.pdf"
    },
    {
      "name": "Chapter 5: Audit Evidence",
      "url": "https://resource.cdn.icai.org/87908bos-aps2168-ch5.pdf"
    },
    {
      "name": "Chapter 6: Completion and Review",
      "url": "https://resource.cdn.icai.org/87909bos-aps2168-ch6.pdf"
    },
    {
      "name": "Chapter 7: Reporting",
      "url": "https://resource.cdn.icai.org/87910bos-aps2168-ch7.pdf"
    },
    {
      "name": "Initial Pages",
      "url": "https://resource.cdn.icai.org/87913bos-aps2168-m3-ip.pdf"
    },
    {
      "name": "Chapter 15: Overview of Audit of Public Sector Undertakings",
      "url": "https://resource.cdn.icai.org/87922bos-aps2168-ch15.pdf"
    },
    {
      "name": "Chapter 16: Internal Audit",
      "url": "https://resource.cdn.icai.org/87923bos-aps2168-ch16.pdf"
    },
    {
      "name": "Chapter 17: Due Diligence, Investigation & Forensic Accounting",
      "url": "https://resource.cdn.icai.org/87924bos-aps2168-ch17.pdf"
    },
    {
      "name": "Chapter 18: Sustainable Development Goals (SDG) & Environment, Social and Governance (ESG) Assurance",
      "url": "https://resource.cdn.icai.org/87925bos-aps2168-ch18.pdf"
    },
    {
      "name": "Chapter 19: Professional Ethics & Liabilities of Auditors",
      "url": "https://resource.cdn.icai.org/87926bos-aps2168-ch19.pdf"
    }
  ],
  "Paper-4: Direct Tax Laws & International Taxation (Applicable for May/ September 2026 & January 2027 Exam)": [
    {
      "name": "Initial pages",
      "url": "https://resource.cdn.icai.org/88893bos-aps2299-m3-ip.pdf"
    },
    {
      "name": "Chapter 13: Deduction, Collection and Recovery of Tax",
      "url": "https://resource.cdn.icai.org/88894bos-aps2299-m3-ch13.pdf"
    },
    {
      "name": "Chapter 14: Income Tax Authorities",
      "url": "https://resource.cdn.icai.org/88895bos-aps2299-m3-ch14.pdf"
    },
    {
      "name": "Chapter 15: Assessment Procedure",
      "url": "https://resource.cdn.icai.org/88896bos-aps2299-m3-ch15.pdf"
    },
    {
      "name": "Chapter 16: Appeals and Revision",
      "url": "https://resource.cdn.icai.org/88897bos-aps2299-m3-ch16.pdf"
    },
    {
      "name": "Chapter 17: Dispute Resolution",
      "url": "https://resource.cdn.icai.org/88898bos-aps2299-m3-ch17.pdf"
    },
    {
      "name": "Chapter 18: Miscellaneous Provisions",
      "url": "https://resource.cdn.icai.org/88899bos-aps2299-m3-ch18.pdf"
    },
    {
      "name": "Chapter 19: Provisions to Counteract Unethical Tax Practices",
      "url": "https://resource.cdn.icai.org/88900bos-aps2299-m3-ch19.pdf"
    },
    {
      "name": "Chapter 20: Tax Audit and Ethical Compliances",
      "url": "https://resource.cdn.icai.org/88902bos-aps2299-m3-ch20.pdf"
    },
    {
      "name": "Initial pages",
      "url": "https://resource.cdn.icai.org/88425bos-aps2299-m4-ip.pdf"
    },
    {
      "name": "Chapter 21: Non Resident Taxation",
      "url": "https://resource.cdn.icai.org/88426bos-aps2299-m4-ch21.pdf"
    },
    {
      "name": "Chapter 22: Double Taxation Relief",
      "url": "https://resource.cdn.icai.org/88427bos-aps2299-m4-ch22.pdf"
    },
    {
      "name": "Chapter 23: Advance Rulings",
      "url": "https://resource.cdn.icai.org/88428bos-aps2299-m4-ch23.pdf"
    },
    {
      "name": "Chapter 24: Transfer Pricing",
      "url": "https://resource.cdn.icai.org/88429bos-aps2299-m4-ch24.pdf"
    },
    {
      "name": "Chapter 25: Fundamentals of BEPS",
      "url": "https://resource.cdn.icai.org/88430bos-aps2299-m4-ch25.pdf"
    },
    {
      "name": "Chapter 26: Application and Interpretation of Tax Treaties",
      "url": "https://resource.cdn.icai.org/88431bos-aps2299-m4-ch26.pdf"
    },
    {
      "name": "Chapter 27: Overview of Model Tax Conventions",
      "url": "https://resource.cdn.icai.org/88432bos-aps2299-m4-ch27.pdf"
    },
    {
      "name": "Chapter 28: Latest Developments in International Taxation",
      "url": "https://resource.cdn.icai.org/88433bos-aps2299-m4-ch28.pdf"
    },
    {
      "name": "Annexure",
      "url": "https://resource.cdn.icai.org/88424bos-aps2299-m4-annex.pdf"
    },
    {
      "name": "Initial pages",
      "url": "https://resource.cdn.icai.org/88275bos-aps2299-m2-ip.pdf"
    },
    {
      "name": "Chapter 9: Assessment of Various Entities",
      "url": "https://resource.cdn.icai.org/88276bos-aps2299-m2-ch9.pdf"
    },
    {
      "name": "Chapter 10: Assessment of Trusts and Institutions, Political Parties and Other Special Entities",
      "url": "https://resource.cdn.icai.org/88277bos-aps2299-m2-ch10.pdf"
    },
    {
      "name": "Chapter 11: Tax Planning, Tax Avoidance and Tax Evasion",
      "url": "https://resource.cdn.icai.org/88278bos-aps2299-m2-ch11.pdf"
    },
    {
      "name": "Chapter 12: Taxation of Digital Transactions",
      "url": "https://resource.cdn.icai.org/88279bos-aps2299-m2-ch12.pdf"
    },
    {
      "name": "Initial Pages",
      "url": "https://resource.cdn.icai.org/88450bos-aps2299-m1-ip.pdf"
    },
    {
      "name": "Chapter 1: Basic Concepts",
      "url": "https://resource.cdn.icai.org/88211bos-aps2299-m1-ch1.pdf"
    },
    {
      "name": "Chapter 2: Incomes which do not form part of Total Income",
      "url": "https://resource.cdn.icai.org/88212bos-aps2299-m1-ch2.pdf"
    },
    {
      "name": "Chapter 3: Profits and Gains of Business or Profession",
      "url": "https://resource.cdn.icai.org/88213bos-aps2299-m1-ch3.pdf"
    },
    {
      "name": "Chapter 4: Capital Gains",
      "url": "https://resource.cdn.icai.org/88214bos-aps2299-m1-ch4.pdf"
    },
    {
      "name": "Chapter 5: Income from Other Sources",
      "url": "https://resource.cdn.icai.org/88215bos-aps2299-m1-ch5.pdf"
    },
    {
      "name": "Chapter 6: Income of Other Persons included in Assessee\u2019s Total Income",
      "url": "https://resource.cdn.icai.org/88216bos-aps2299-m1-ch6.pdf"
    },
    {
      "name": "Chapter 7: Aggregation of Income, Set Off or Carry Forward of Losses",
      "url": "https://resource.cdn.icai.org/88217bos-aps2299-m1-ch7.pdf"
    },
    {
      "name": "Chapter 8: Deductions from Gross Total Income",
      "url": "https://resource.cdn.icai.org/88218bos-aps2299-m1-ch8.pdf"
    },
    {
      "name": "Annexure",
      "url": "https://resource.cdn.icai.org/88210bos-aps2299-m1-annex.pdf"
    }
  ],
  "Paper-5: Indirect Tax Laws (Applicable for May 2026/ September 2026/January 2027 Exam)": [
    {
      "name": "Initial Page",
      "url": "https://resource.cdn.icai.org/88885bos-aps2102-m2-ip.pdf"
    },
    {
      "name": "Chapter 7: Input Tax Credit",
      "url": "https://resource.cdn.icai.org/88886bos-aps2102-m2-p7.pdf"
    },
    {
      "name": "Chapter 8: Registration",
      "url": "https://resource.cdn.icai.org/88887bos-aps2102-m2-p8.pdf"
    },
    {
      "name": "Chapter 9: Tax Invoice, Credit and Debit Notes",
      "url": "https://resource.cdn.icai.org/88888bos-aps2102-m2-p9.pdf"
    },
    {
      "name": "Chapter 10: Accounts and Records; E-way Bill",
      "url": "https://resource.cdn.icai.org/88889bos-aps2102-m2-p10.pdf"
    },
    {
      "name": "Chapter 11: Payment of Tax",
      "url": "https://resource.cdn.icai.org/88890bos-aps2102-m2-p11.pdf"
    },
    {
      "name": "Chapter 12: Electronic Commerce Transactions",
      "url": "https://resource.cdn.icai.org/88891bos-aps2102-m2-p12.pdf"
    },
    {
      "name": "Chapter 13: Returns",
      "url": "https://resource.cdn.icai.org/88892bos-aps2102-m2-p13.pdf"
    },
    {
      "name": "Initial Page",
      "url": "https://resource.cdn.icai.org/88818bos-aps2102-m3-ip.pdf"
    },
    {
      "name": "Chapter 14: Import and Export Under GST",
      "url": "https://resource.cdn.icai.org/88819bos-aps2102-m3-ch14.pdf"
    },
    {
      "name": "Chapter 15: Refunds",
      "url": "https://resource.cdn.icai.org/88820bos-aps2102-m3-ch15.pdf"
    },
    {
      "name": "Chapter 16: Job Work",
      "url": "https://resource.cdn.icai.org/88821bos-aps2102-m3-ch16.pdf"
    },
    {
      "name": "Chapter 17: Assessment and Audit",
      "url": "https://resource.cdn.icai.org/88822bos-aps2102-m3-ch17.pdf"
    },
    {
      "name": "Chapter 18: Inspection, Search, Seizure and Arrest",
      "url": "https://resource.cdn.icai.org/88823bos-aps2102-m3-ch18.pdf"
    },
    {
      "name": "Chapter 19: Demands and Recovery",
      "url": "https://resource.cdn.icai.org/88824bos-aps2102-m3-ch19.pdf"
    },
    {
      "name": "Chapter 20: Liability to Pay in Certain Cases",
      "url": "https://resource.cdn.icai.org/88825bos-aps2102-m3-ch20.pdf"
    },
    {
      "name": "Chapter 21: Offences and Penalties and Ethical Aspects under GST",
      "url": "https://resource.cdn.icai.org/88826bos-aps2102-m3-ch21.pdf"
    },
    {
      "name": "Chapter 22: Appeals and Revision",
      "url": "https://resource.cdn.icai.org/88827bos-aps2102-m3-ch22.pdf"
    },
    {
      "name": "Chapter 23: Advance Ruling",
      "url": "https://resource.cdn.icai.org/88828bos-aps2102-m3-ch23.pdf"
    },
    {
      "name": "Chapter 24: Miscellaneous Provisions",
      "url": "https://resource.cdn.icai.org/88829bos-aps2102-m3-ch24.pdf"
    },
    {
      "name": "Initial Page",
      "url": "https://resource.cdn.icai.org/87893bos-aps2102-m4-ip.pdf"
    },
    {
      "name": "Chapter 1: Levy of and Exemptions from Customs Duty",
      "units": [
        {
          "name": "Unit I- Introduction to Customs Law",
          "url": "https://resource.cdn.icai.org/87894bos-aps2102-m4-ch1u1.pdf"
        },
        {
          "name": "Unit II - Levy and Exemptions",
          "url": "https://resource.cdn.icai.org/87895bos-aps2102-m4-ch1u2.pdf"
        }
      ]
    },
    {
      "name": "Chapter 2: Types of Duty",
      "url": "https://resource.cdn.icai.org/87896bos-aps2102-m4-ch2.pdf"
    },
    {
      "name": "Chapter 3: Classification of Imported and Export Goods",
      "url": "https://resource.cdn.icai.org/87897bos-aps2102-m4-ch3.pdf"
    },
    {
      "name": "Chapter 4: Valuation under the Customs Act, 1962",
      "url": "https://resource.cdn.icai.org/87898bos-aps2102-m4-ch4.pdf"
    },
    {
      "name": "Chapter 5: Importation and Exportation of Goods",
      "url": "https://resource.cdn.icai.org/87899bos-aps2102-m4-ch5.pdf"
    },
    {
      "name": "Chapter 6: Warehousing",
      "url": "https://resource.cdn.icai.org/87900bos-aps2102-m4-ch6.pdf"
    },
    {
      "name": "Chapter 7: Refund",
      "url": "https://resource.cdn.icai.org/87901bos-aps2102-m4-ch7.pdf"
    },
    {
      "name": "Chapter 8: Foreign Trade Policy",
      "units": [
        {
          "name": "Unit I - Introduction to FTP",
          "url": "https://resource.cdn.icai.org/87902bos-aps2102-m4-ch8u1.pdf"
        },
        {
          "name": "Unit II Basic Concepts relating to Export Promotion Schemes under FTP",
          "url": "https://resource.cdn.icai.org/87903bos-aps2102-m4-ch8u2.pdf"
        }
      ]
    },
    {
      "name": "Initial Page",
      "url": "https://resource.cdn.icai.org/88086bos-aps2102-ip.pdf"
    },
    {
      "name": "Chapter-1: Supply under GST",
      "url": "https://resource.cdn.icai.org/87619bos-aps2102-p5u1.pdf"
    },
    {
      "name": "Chapter 2: Charge of GST",
      "url": "https://resource.cdn.icai.org/87620bos-aps2102-p5u2.pdf"
    },
    {
      "name": "Chapter 3: Place of Supply",
      "url": "https://resource.cdn.icai.org/87621bos-aps2102-p5u3.pdf"
    },
    {
      "name": "Chapter 4: Exemptions from GST",
      "url": "https://resource.cdn.icai.org/87622bos-aps2102-p5u4.pdf"
    },
    {
      "name": "Chapter 5: Time of Supply",
      "url": "https://resource.cdn.icai.org/87623bos-aps2102-p5u5.pdf"
    },
    {
      "name": "Chapter 6: Value of Supply",
      "url": "https://resource.cdn.icai.org/88087bos-aps2102-ch6.pdf"
    }
  ]
};
const CA_SYLLABUS = {
    "FR": {
        name: "Financial Reporting",
        group: "1",
        color: "blue",
        chapters: [
            { name: "Introduction to Indian Accounting Standards", marks: "0-2", category: "E" },
            { name: "Conceptual Framework for Financial Reporting under Ind AS", marks: "2-4", category: "D" },
            { name: "Ind AS on Presentation of Items in the Financial Statements", marks: "4-6", category: "C" },
            { name: "Ind AS on Measurement based on Accounting Policies", marks: "4-6", category: "C" },
            { name: "Ind AS on Assets of the Financial Statements", marks: "8-12", category: "B" },
            { name: "Ind AS on Liabilities of the Financial Statements", marks: "6-8", category: "C" },
            { name: "Ind AS on Items impacting the Financial Statements", marks: "6-10", category: "B" },
            { name: "Ind AS on Disclosures in the Financial Statements", marks: "4-6", category: "C" },
            { name: "Other Ind AS", marks: "4-6", category: "C" },
            { name: "Ind AS 115 - Revenue from Contracts with Customers", marks: "10-15", category: "A" },
            { name: "Accounting and Reporting of Financial Instruments", marks: "15-20", category: "A" },
            { name: "Business Combinations and Corporate Restructuring", marks: "15-20", category: "A" },
            { name: "Consolidated and Separate Financial Statements", marks: "15-20", category: "A" },
            { name: "First-time Adoption of Indian Accounting Standards", marks: "2-4", category: "D" },
            { name: "Analysis of Financial Statements", marks: "8-10", category: "B" },
            { name: "Professional and Ethical Duty of a Chartered Accountant", marks: "2-4", category: "D" },
            { name: "Accounting and Technology", marks: "0-2", category: "E" }
        ]
    },
    "AFM": {
        name: "Advanced Financial Management",
        group: "1",
        color: "purple",
        chapters: [
            { name: "Financial Policy and Corporate Strategy", marks: "0-4", category: "E" },
            { name: "Risk Management", marks: "4-6", category: "C" },
            { name: "Advanced Capital Budgeting Decisions", marks: "8-12", category: "B" },
            { name: "Security Analysis", marks: "4-8", category: "C" },
            { name: "Security Valuation", marks: "8-12", category: "B" },
            { name: "Portfolio Management", marks: "12-16", category: "A" },
            { name: "Securitization", marks: "0-4", category: "E" },
            { name: "Mutual Funds", marks: "6-10", category: "C" },
            { name: "Derivatives Analysis and Valuation", marks: "12-18", category: "A" },
            { name: "Foreign Exchange Exposure and Risk Management", marks: "12-18", category: "A" },
            { name: "International Financial Management", marks: "6-10", category: "B" },
            { name: "Interest Rate Risk Management", marks: "6-8", category: "C" },
            { name: "Business Valuation", marks: "8-12", category: "B" },
            { name: "Mergers, Acquisitions and Corporate Restructuring", marks: "12-16", category: "A" },
            { name: "Startup Finance", marks: "2-4", category: "D" }
        ]
    },
    "Audit": {
        name: "Advanced Auditing",
        group: "1",
        color: "green",
        chapters: [
            { name: "Quality Control", marks: "4-6", category: "C" },
            { name: "General Auditing Principles and Auditors Responsibilities", marks: "8-12", category: "B" },
            { name: "Audit Planning, Strategy and Execution", marks: "4-8", category: "C" },
            { name: "Materiality, Risk Assessment and Internal Control", marks: "6-10", category: "B" },
            { name: "Audit Evidence", marks: "6-10", category: "B" },
            { name: "Completion and Review", marks: "4-6", category: "C" },
            { name: "Reporting", marks: "6-8", category: "C" },
            { name: "Specialised Areas", marks: "10-15", category: "A" },
            { name: "Related Services", marks: "4-8", category: "C" },
            { name: "Review of Financial Information", marks: "2-4", category: "D" },
            { name: "Prospective Financial Information and Other Assurance Services", marks: "2-4", category: "D" },
            { name: "Digital Auditing & Assurance", marks: "4-6", category: "C" },
            { name: "Group Audits", marks: "8-12", category: "A" },
            { name: "Special Features of Audit of Banks & Non-Banking Financial Companies", marks: "8-12", category: "B" },
            { name: "Overview of Audit of Public Sector Undertakings", marks: "2-4", category: "D" },
            { name: "Internal Audit", marks: "4-6", category: "C" },
            { name: "Due Diligence, Investigation & Forensic Accounting", marks: "8-12", category: "B" },
            { name: "Sustainable Development Goals (SDG) & Environment, Social and Governance (ESG) Assurance", marks: "2-4", category: "E" },
            { name: "Professional Ethics & Liabilities of Auditors", marks: "12-16", category: "A" }
        ]
    },
    "DT": {
        name: "Direct Tax Laws",
        group: "2",
        color: "blue",
        sections: {
            0: "Part 1 - Direct Tax Laws",
            20: "Part 2 - International Taxation"
        },
        chapters: [
            { name: "Basic Concepts", marks: "0-2", category: "E" },
            { name: "Incomes which do not form part of Total Income", marks: "2-4", category: "D" },
            { name: "Profits and Gains of Business or Profession", marks: "12-16", category: "A" },
            { name: "Capital Gains", marks: "8-12", category: "A" },
            { name: "Income from Other Sources", marks: "2-4", category: "D" },
            { name: "Income of Other Persons included in Assessee's Total Income", marks: "2-4", category: "D" },
            { name: "Aggregation of Income, Set Off or Carry Forward of Losses", marks: "4-6", category: "C" },
            { name: "Deductions from Gross Total Income", marks: "6-8", category: "C" },
            { name: "Assessment of Various Entities", marks: "8-12", category: "B" },
            { name: "Assessment of Trusts and Institutions, Political Parties and Other Special Entities", marks: "8-12", category: "B" },
            { name: "Tax Planning, Tax Avoidance and Tax Evasion", marks: "4-6", category: "C" },
            { name: "Taxation of Digital Transactions", marks: "2-4", category: "D" },
            { name: "Deduction, Collection and Recovery of Tax", marks: "6-8", category: "C" },
            { name: "Income Tax Authorities", marks: "2-4", category: "D" },
            { name: "Assessment Procedure", marks: "6-10", category: "B" },
            { name: "Appeals and Revision", marks: "4-6", category: "C" },
            { name: "Dispute Resolution", marks: "4-6", category: "C" },
            { name: "Miscellaneous Provisions", marks: "2-4", category: "D" },
            { name: "Provisions to Counteract Unethical Tax Practices", marks: "2-4", category: "D" },
            { name: "Tax Audit and Ethical Compliances", marks: "4-6", category: "C" },
            { name: "Non-Resident Taxation", marks: "12-16", category: "A" },
            { name: "Double Taxation Relief", marks: "8-12", category: "A" },
            { name: "Advance Rulings", marks: "2-4", category: "D" },
            { name: "Transfer Pricing", marks: "10-15", category: "A" },
            { name: "Fundamentals of BEPS", marks: "2-4", category: "D" },
            { name: "Application and Interpretation of Tax Treaties", marks: "4-6", category: "C" },
            { name: "Overview of Model Tax Conventions", marks: "2-4", category: "D" },
            { name: "Latest Developments in International Taxation", marks: "2-4", category: "D" }
        ]
    },
    "IDT": {
        name: "Indirect Tax Laws",
        group: "2",
        color: "purple",
        sections: {
            0: "Part 1 - Goods and Services Tax",
            24: "Part 2 - Customs & FTP"
        },
        chapters: [
            { name: "Supply under GST", marks: "6-10", category: "B" },
            { name: "Charge of GST", marks: "4-6", category: "C" },
            { name: "Place of Supply", marks: "8-12", category: "A" },
            { name: "Exemptions from GST", marks: "6-10", category: "B" },
            { name: "Time of Supply", marks: "6-8", category: "C" },
            { name: "Value of Supply", marks: "8-12", category: "A" },
            { name: "Input Tax Credit", marks: "12-16", category: "A" },
            { name: "Registration", marks: "4-6", category: "C" },
            { name: "Tax Invoice, Credit and Debit Notes", marks: "2-4", category: "D" },
            { name: "Accounts and Records; E-way Bill", marks: "2-4", category: "D" },
            { name: "Payment of Tax", marks: "2-4", category: "D" },
            { name: "Electronic Commerce Transactions", marks: "4-6", category: "C" },
            { name: "Returns", marks: "4-6", category: "C" },
            { name: "Import and Export under GST", marks: "4-6", category: "C" },
            { name: "Refunds", marks: "6-10", category: "B" },
            { name: "Job Work", marks: "2-4", category: "D" },
            { name: "Assessment and Audit", marks: "4-6", category: "C" },
            { name: "Inspection, Search, Seizure and Arrest", marks: "2-4", category: "D" },
            { name: "Demands and Recovery", marks: "6-10", category: "B" },
            { name: "Liability to Pay in Certain Cases", marks: "2-4", category: "D" },
            { name: "Offences and Penalties and Ethical Aspects under GST", marks: "2-4", category: "D" },
            { name: "Appeals and Revision", marks: "4-6", category: "C" },
            { name: "Advance Ruling", marks: "2-4", category: "D" },
            { name: "Miscellaneous Provisions", marks: "2-4", category: "D" },
            { name: "Levy of and Exemptions from Customs Duty", marks: "4-6", category: "C" },
            { name: "Types of Duty", marks: "2-4", category: "D" },
            { name: "Classification of Imported and Exported Goods", marks: "2-4", category: "D" },
            { name: "Valuation under the Customs Act, 1962", marks: "6-10", category: "B" },
            { name: "Importation and Exportation of Goods", marks: "2-4", category: "D" },
            { name: "Warehousing", marks: "2-4", category: "D" },
            { name: "Refund", marks: "2-4", category: "D" },
            { name: "Foreign Trade Policy", marks: "4-6", category: "C" }
        ]
    },
    "IBS": {
        name: "Integrated Business Solutions",
        group: "2",
        color: "green",
        constituents: [
            { id: "DT", weight: 0.25 },
            { id: "FR", weight: 0.25 },
            { id: "IDT", weight: 0.15 },
            { id: "Audit", weight: 0.15 },
            { id: "SPOM", weight: 0.10 },
            { id: "AFM", weight: 0.10 }
        ],
        chapters: []
    },
    "ADVANCED_ICITSS": {
        name: "ADVANCED ICITSS",
        group: "Req",
        color: "blue",
        chapters: [
            {
                name: "Advanced Information Technology Training (Adv. ITT)",
                metrics: [
                    { id: "commencement_date", label: "Start Date", type: "date" },
                    { id: "completion_date", label: "End Date", type: "date" },
                    { id: "exam_date", label: "Exam Date", type: "date" },
                    { id: "test_result", label: "Test Result" }
                ]
            },
            {
                name: "Management and Communication Skills (MCS)",
                metrics: [
                    { id: "commencement_date", label: "Start Date", type: "date" },
                    { id: "completion_date", label: "End Date", type: "date" },
                    { id: "certificate", label: "Certificate" }
                ]
            }
        ]
    },
    "SPOM": {
        name: "Self-Paced Online Modules",
        group: "Req",
        color: "purple",
        chapters: [
            { name: "SET A: Corporate and Economic Laws" },
            { name: "SET B: Strategic Cost & Performance Management" }
        ],
        customMetrics: [
            { id: "exam_date", label: "Exam Date", type: "date" },
            { id: "reading", label: "Reading" },
            { id: "passed", label: "Passed" }
        ]
    }
};

const DEFAULT_METRICS = [
    { id: "reading", label: "Reading" },
    { id: "revision1", label: "Rev 1" },
    { id: "revision2", label: "Rev 2" }
];

function getMetricsForSubject(subjectId) {
    return CA_SYLLABUS[subjectId].customMetrics || DEFAULT_METRICS;
}

function getMetricsForChapter(subjectId, chapterIndex) {
    const ch = CA_SYLLABUS[subjectId].chapters[chapterIndex];
    if (typeof ch === 'object' && ch.metrics) {
        return ch.metrics;
    }
    return getMetricsForSubject(subjectId);
}

function getChapterName(subjectId, chapterIndex) {
    const ch = CA_SYLLABUS[subjectId].chapters[chapterIndex];
    return typeof ch === 'object' ? ch.name : ch;
}

function getChapterMetadata(subjectId, chapterIndex) {
    const ch = CA_SYLLABUS[subjectId].chapters[chapterIndex];
    if (typeof ch === 'object') {
        return { marks: ch.marks, category: ch.category };
    }
    return {};
}

// State Management
let progressData = {};

function initData() {
    // 1. Load from LocalStorage instantly
    const stored = localStorage.getItem('caFinalProgress');
    if (stored) progressData = JSON.parse(stored);
    
    // 2. Patch missing subjects
    let updated = false;
    Object.keys(CA_SYLLABUS).forEach(subjectId => {
        if (!progressData[subjectId]) {
            progressData[subjectId] = {};
            updated = true;
        }
        CA_SYLLABUS[subjectId].chapters.forEach((_, index) => {
            const metrics = getMetricsForChapter(subjectId, index);
            if (!progressData[subjectId][index]) {
                progressData[subjectId][index] = {};
                metrics.forEach(m => {
                    progressData[subjectId][index][m.id] = m.type === 'date' ? '' : false;
                });
                updated = true;
            }
        });
    });
    
    if (updated) {
        // don't trigger firebase save during init patching
        localStorage.setItem('caFinalProgress', JSON.stringify(progressData));
    }

    // 3. Fetch from Firebase in background
    if (db) {
        db.ref('userData').once('value').then(snapshot => {
            const cloudData = snapshot.val();
            if (cloudData) {
                let changed = false;
                if (cloudData.progressData) { progressData = cloudData.progressData; changed = true; }
                if (cloudData.examDate) { localStorage.setItem('caFinalExamDate', cloudData.examDate); changed = true; }
                if (cloudData.schedule) { localStorage.setItem('caFinalSchedule', JSON.stringify(cloudData.schedule)); changed = true; }
                if (cloudData.mocks) { localStorage.setItem('caFinalMocks', JSON.stringify(cloudData.mocks)); changed = true; }
                
                if (changed) {
                    updateOverallProgress();
                    // Check which view is active and re-render
                    const activeView = document.querySelector('.nav-item.active');
                    if (activeView) {
                        const view = activeView.getAttribute('data-view');
                        if (view === 'dashboard') renderDashboard();
                        else if (view === 'subject') {
                            const sid = activeView.getAttribute('data-subject');
                            if (sid) renderSubjectView(sid);
                        }
                        else if (view === 'mock') renderMockTestsView();
                        else if (view === 'schedule') renderScheduleView();
                    } else {
                        renderDashboard();
                    }
                }
            }
        }).catch(e => {
            console.log("Firebase sync failed or blocked", e);
        });
    }
}


function saveData() {
    localStorage.setItem('caFinalProgress', JSON.stringify(progressData));
    updateOverallProgress();
    
    if (db) {
        showSyncing();
        db.ref('userData/progressData').set(progressData);
    }
}

function getChapterAverageMarks(marksStr) {
    if (!marksStr) return 1;
    const parts = marksStr.split('-').map(Number);
    if (parts.length === 2) return (parts[0] + parts[1]) / 2;
    return parts[0] || 1;
}

function calculateSubjectProgress(subjectId) {
    if (subjectId === 'IBS') {
        return getIBSReadinessScore();
    }

    const chapters = progressData[subjectId];
    if (!chapters) return 0;
    
    const chapterList = CA_SYLLABUS[subjectId].chapters;
    const chapterCount = chapterList.length;
    
    let subjectTotalMarks = 0;
    let idtPart1Marks = 0;
    let idtPart2Marks = 0;
    
    chapterList.forEach((ch, idx) => {
        const marks = getChapterAverageMarks(ch.marks);
        subjectTotalMarks += marks;
        if (subjectId === 'IDT') {
            if (idx < 24) idtPart1Marks += marks;
            else idtPart2Marks += marks;
        }
    });
    
    let totalPoints = 0;
    let earnedPoints = 0;
    
    // Weights for internal study stages
    const metricWeights = {
        'reading': 50,
        'revision1': 25,
        'revision2': 15
    };
    
    for (let i = 0; i < chapterCount; i++) {
        const ch = chapters[i] || {};
        const chapterDef = chapterList[i];
        
        const chapterAvg = getChapterAverageMarks(chapterDef.marks);
        let chapterWeightMultiplier = chapterAvg / subjectTotalMarks;
        
        // Exact 80/20 enforcement for IDT parts
        if (subjectId === 'IDT') {
            if (i < 24) {
                chapterWeightMultiplier = (chapterAvg / idtPart1Marks) * 0.80;
            } else {
                chapterWeightMultiplier = (chapterAvg / idtPart2Marks) * 0.20;
            }
        }
        
        const allMetrics = getMetricsForChapter(subjectId, i);
        const booleanMetrics = allMetrics.filter(m => m.type !== 'date');
        
        const defaultWeight = booleanMetrics.length > 0 ? 100 / booleanMetrics.length : 0;
        
        booleanMetrics.forEach(m => {
            const baseWeight = metricWeights[m.id] !== undefined ? metricWeights[m.id] : defaultWeight;
            const finalWeight = baseWeight * chapterWeightMultiplier;
            
            totalPoints += finalWeight;
            if (ch[m.id]) {
                earnedPoints += finalWeight;
            }
        });
    }
    
    let basePercentage = totalPoints === 0 ? 0 : (earnedPoints / totalPoints);
    
    const standardSubjects = ["FR", "AFM", "Audit", "DT", "IDT", "IBS"];
    if (standardSubjects.includes(subjectId)) {
        // Chapters account for 90%, Mock Tests account for 10%
        let mockPoints = 0;
        const mockData = JSON.parse(localStorage.getItem('caFinalMocks') || '{}');
        const subjMocks = mockData[subjectId] || {};
        if (subjMocks['mock1'] && subjMocks['mock1'].completed) mockPoints += 10;
        
        return Math.round((basePercentage * 90) + mockPoints);
    } else {
        return Math.round(basePercentage * 100);
    }
}

function calculateSubjectMetricBreakdown(subjectId) {
    const chapters = progressData[subjectId];
    if (!chapters) return [];
    
    const chapterCount = CA_SYLLABUS[subjectId].chapters.length;
    const metricStats = {};
    const metricOrder = [];
    
    let subjectTotalMarks = 0;
    let idtPart1Marks = 0;
    let idtPart2Marks = 0;
    const chapterList = CA_SYLLABUS[subjectId].chapters;
    
    chapterList.forEach((ch, idx) => {
        const marks = getChapterAverageMarks(ch.marks);
        subjectTotalMarks += marks;
        if (subjectId === 'IDT') {
            if (idx < 24) idtPart1Marks += marks;
            else idtPart2Marks += marks;
        }
    });

    for (let i = 0; i < chapterCount; i++) {
        const ch = chapters[i];
        
        let chapterWeightMultiplier = 1;
        if (subjectTotalMarks > 0) {
            const chapterAvg = getChapterAverageMarks(chapterList[i].marks);
            chapterWeightMultiplier = chapterAvg / subjectTotalMarks;
            
            if (subjectId === 'IDT') {
                if (i < 24) {
                    chapterWeightMultiplier = idtPart1Marks > 0 ? (chapterAvg / idtPart1Marks) * 0.80 : 0;
                } else {
                    chapterWeightMultiplier = idtPart2Marks > 0 ? (chapterAvg / idtPart2Marks) * 0.20 : 0;
                }
            }
        }
        
        const metrics = getMetricsForChapter(subjectId, i);
        metrics.forEach(m => {
            if (m.type !== 'date') {
                if (!metricStats[m.id]) {
                    metricStats[m.id] = { label: m.label, total: 0, completed: 0 };
                    metricOrder.push(m.id);
                }
                metricStats[m.id].total += chapterWeightMultiplier;
                if (ch && ch[m.id]) {
                    metricStats[m.id].completed += chapterWeightMultiplier;
                }
            }
        });
    }
    
    return metricOrder.map(id => {
        const stat = metricStats[id];
        return {
            label: stat.label,
            percentage: stat.total === 0 ? 0 : Math.round((stat.completed / stat.total) * 100)
        };
    });
}

function updateOverallProgress() {
    let globalEarned = 0;
    let globalTotal = 0;
    
    Object.keys(CA_SYLLABUS).forEach(subjectId => {
        const prog = calculateSubjectProgress(subjectId);
        globalEarned += prog;
        globalTotal += 100;
    });
    
    const percentage = globalTotal === 0 ? 0 : Math.round((globalEarned / globalTotal) * 100);
    
    const fillRect = document.getElementById('overall-progress-rect');
    const text = document.getElementById('overall-progress-text');
    
    if (fillRect && text) {
        // height = percentage, y = 100 - percentage (so it fills bottom to top)
        fillRect.setAttribute('height', percentage);
        fillRect.setAttribute('y', 100 - percentage);
        text.innerText = `${percentage}%`;
    }
}

// UI Rendering
function formatStringDate(dateStr) {
    if (!dateStr) return 'Select Date';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const ddd = days[dateObj.getDay()];
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const mmm = months[dateObj.getMonth()];
    const yy = String(dateObj.getFullYear()).slice(-2);
    
    return `${ddd}, ${dd}-${mmm}-${yy}`;
}

function getFormattedDate(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const ddd = days[date.getDay()];
    const dd = String(date.getDate()).padStart(2, '0');
    const mmm = months[date.getMonth()];
    const yy = String(date.getFullYear()).slice(-2);
    
    return `${ddd}, ${dd}-${mmm}-${yy}`;
}

function calculateDaysLeft(dateStr = null) {
    const targetDateStr = dateStr || localStorage.getItem('caFinalExamDate');
    if (!targetDateStr) return '-';
    const targetDate = new Date(targetDateStr);
    const today = new Date();
    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
}

window.updateExamDate = function(el) {
    localStorage.setItem('caFinalExamDate', el.value);
    document.getElementById('days-left').innerText = calculateDaysLeft();
    if (db) {
        showSyncing();
        db.ref('userData/examDate').set(el.value);
    }
};

function renderDashboard() {
    const container = document.getElementById('view-container');
    
    let globalEarned = 0;
    let globalTotal = 0;
    Object.keys(CA_SYLLABUS).forEach(sid => {
        globalEarned += calculateSubjectProgress(sid);
        globalTotal += 100;
    });
    const percentage = globalTotal === 0 ? 0 : Math.round((globalEarned / globalTotal) * 100);
    
    let html = `
        <div class="view-header dashboard-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: nowrap; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="flex-shrink: 0;">
                <h2 style="white-space: nowrap;">Welcome Back, ${auth && auth.currentUser && auth.currentUser.email === 'arinolf@tracker.com' ? 'Arinolf' : 'Wonderer'} !!</h2>
                <p style="color: #ff4444; font-weight: bold; font-size: 1.05rem; margin-top: 0.5rem; letter-spacing: 0.02em; white-space: nowrap;">There is no peace without a great war.</p>
            </div>
            <div class="dashboard-stats" style="display: flex; gap: 1rem; align-items: center; flex-wrap: nowrap; flex-shrink: 0;">
                <div class="countdown-card glass-panel" style="padding: 1rem 1.5rem; display: flex; gap: 2rem; align-items: center; border-color: rgba(59, 130, 246, 0.3); background: rgba(0, 53, 107, 0.4);">
                    <div>
                        <p style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Today's Date</p>
                        <h4 style="font-size: 1rem; color: var(--text-primary); font-weight: 500;">${getFormattedDate(new Date())}</h4>
                    </div>
                    <div>
                        <p style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Exam Date</p>
                        <div style="height: 26px;">
                            <input type="text" class="custom-date-picker" data-action="exam-date" value="${localStorage.getItem('caFinalExamDate') || ''}" placeholder="Select Date" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); color: var(--text-primary); border-radius: 4px; font-family: var(--font-family); font-size: 0.85rem; height: 100%; padding: 0 8px; cursor: pointer; width: 140px; outline: none; text-align: center;">
                        </div>
                    </div>
                    <div style="text-align: right; border-left: 1px solid rgba(255,255,255,0.1); padding-left: 1.5rem;">
                        <p style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Days Left</p>
                        <h3 id="days-left" style="font-size: 2rem; color: white; line-height: 1;">${calculateDaysLeft()}</h3>
                    </div>
                </div>
                
                <div class="overall-progress-card glass-panel" style="padding: 1rem 1.5rem; display: flex; gap: 1.25rem; align-items: center; border-color: rgba(59, 130, 246, 0.3); background: rgba(0, 53, 107, 0.4);">
                    <div style="text-align: right;">
                        <p style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Overall</p>
                        <h4 style="font-size: 1.4rem; color: var(--accent-blue); font-weight: bold; line-height: 1;">${percentage}%</h4>
                    </div>
                    <div style="width: 50px; height: 50px; position: relative; display: flex; align-items: center; justify-content: center;">
                        <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; position: absolute;">
                            <defs>
                                <clipPath id="headerFillClip">
                                    <rect x="0" y="${100 - percentage}" width="100" height="${percentage}" />
                                </clipPath>
                            </defs>
                            <polygon points="50 5, 88 27, 88 73, 50 95, 12 73, 12 27" 
                                     fill="rgba(255, 255, 255, 0.05)" 
                                     stroke="rgba(255, 255, 255, 0.15)" stroke-width="3"/>
                            <polygon points="50 5, 88 27, 88 73, 50 95, 12 73, 12 27" 
                                     fill="var(--accent-blue)" 
                                     clip-path="url(#headerFillClip)" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    `;
    const buildCard = (subjectId) => {
        const subject = CA_SYLLABUS[subjectId];
        const progress = calculateSubjectProgress(subjectId);
        const breakdown = calculateSubjectMetricBreakdown(subjectId);
        
        let breakdownHtml = '<div class="metric-breakdown" style="margin-top: auto; display: flex; flex-direction: column; gap: 0.4rem; width: 100%;">';
        breakdown.forEach(b => {
            breakdownHtml += `
                <div class="metric-row" style="display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem;">
                    <span style="color: var(--text-secondary); width: 4.2rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${b.label}">${b.label}</span>
                    <div class="mini-progress-bar" style="flex-grow: 1; height: 4px; background: rgba(255,255,255,0.1); margin: 0 10px; border-radius: 2px; overflow: hidden;">
                        <div style="width: ${b.percentage}%; height: 100%; background: var(--success); transition: width 0.5s ease;"></div>
                    </div>
                    <span style="color: var(--text-primary); width: 4.5rem; text-align: right; font-weight: bold;">${b.percentage}%</span>
                </div>
            `;
        });

        let mockStatusHtml = '';
        if (subject.group !== 'Req') {
            const allMocks = JSON.parse(localStorage.getItem('caFinalMocks') || '{}');
            const mockData = (allMocks[subjectId] && allMocks[subjectId]['mock1']) || {};
            const hasMockDate = !!mockData.date;
            const mockScore = mockData.score || '';
            const statusColor = hasMockDate ? (mockScore ? '#4caf50' : '#ff9800') : '#9e9e9e';
            const statusText = hasMockDate ? (mockScore ? `${mockScore}/100` : `${mockData.date}`) : 'Pending';
            
            mockStatusHtml = `
                <div class="metric-row" style="margin-top: 0.1rem; padding-top: 0.4rem; border-top: 1px dashed rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem;">
                    <span style="color: var(--text-secondary); width: 4.2rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="Mock Test"><i class='bx bx-edit-alt' style="margin-right: 2px; vertical-align: middle;"></i>Mock 1</span>
                    <div style="flex-grow: 1; height: 1px; border-bottom: 1px dotted rgba(255,255,255,0.15); margin: 0 10px;"></div>
                    <span style="color: ${statusColor}; width: 4.5rem; text-align: right; font-weight: bold; white-space: nowrap;">${statusText}</span>
                </div>
            `;
        }

        breakdownHtml += mockStatusHtml + '</div>';

        return `
            <div class="subject-card glass-panel" onclick="navigateToSubject('${subjectId}')" style="display: flex; flex-direction: column; justify-content: flex-start; height: 100%;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
                    <div class="card-info" style="flex: 1;">
                        <p>${subject.group === 'Req' ? 'Other Reqs' : 'Group ' + subject.group}</p>
                        <h3>${subject.name}</h3>
                        <p style="${subjectId === 'IBS' ? 'font-size: 0.65rem; color: var(--accent-green); font-style: italic;' : ''}">${subjectId === 'IBS' ? 'Linked to other Five papers and SPOM Set A & Set B' : subject.chapters.length + ' ' + (subject.group === 'Req' ? 'Modules' : 'Chapters')}</p>
                    </div>
                    <div class="card-ring" style="width: 3.5rem; height: 3.5rem; flex-shrink: 0; position: relative; display: flex; align-items: center; justify-content: center;">
                        <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; position: absolute;">
                            <defs>
                                <clipPath id="fillClip-${subjectId}">
                                    <rect x="0" y="${100 - progress}" width="100" height="${progress}" style="transition: all 0.5s ease;" />
                                </clipPath>
                            </defs>
                            <polygon points="50 5, 88 27, 88 73, 50 95, 12 73, 12 27" 
                                     fill="rgba(255, 255, 255, 0.05)" 
                                     stroke="rgba(255, 255, 255, 0.15)" stroke-width="3"/>
                            <polygon points="50 5, 88 27, 88 73, 50 95, 12 73, 12 27" 
                                     fill="var(--success)" 
                                     clip-path="url(#fillClip-${subjectId})" />
                        </svg>
                        <div class="percentage" style="font-size: 0.75rem; position: absolute; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${progress}%</div>
                    </div>
                </div>
                ${breakdownHtml}
            </div>
        `;
    };

    const group1 = ["FR", "AFM", "Audit"];
    const group2 = ["DT", "IDT", "IBS"];
    const reqs = ["ADVANCED_ICITSS", "SPOM"];

    html += `
        <div class="dashboard-sections" style="display: grid; grid-template-columns: 3fr 1fr; gap: 1.5rem; align-items: stretch; margin-bottom: 1.5rem;">
            
            <!-- Core Papers Container -->
            <div class="glass-panel" style="padding: 1.25rem; background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 255, 255, 0.05); display: flex; flex-direction: column;">
                <h3 style="margin-bottom: 1rem; color: var(--text-primary); font-size: 1.15rem; display: flex; align-items: center; gap: 0.5rem;"><i class='bx bx-book-open'></i> Core Papers</h3>
                
                <div style="display: flex; flex-direction: column; gap: 1rem; flex-grow: 1;">
                    
                    <!-- Group 1 -->
                    <div style="padding: 1rem; background: rgba(255, 255, 255, 0.02); border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.03); flex: 1;">
                        <h4 style="margin-bottom: 0.75rem; color: var(--accent-blue); font-size: 1rem; letter-spacing: 0.05em; text-transform: uppercase;">Group I</h4>
                        <div class="nested-grid-3">
                            ${group1.map(buildCard).join('')}
                        </div>
                    </div>
                    
                    <!-- Group 2 -->
                    <div style="padding: 1rem; background: rgba(255, 255, 255, 0.02); border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.03); flex: 1;">
                        <h4 style="margin-bottom: 0.75rem; color: var(--accent-purple); font-size: 1rem; letter-spacing: 0.05em; text-transform: uppercase;">Group II</h4>
                        <div class="nested-grid-3">
                            ${group2.map(buildCard).join('')}
                        </div>
                    </div>
                    
                </div>
            </div>
            
            <!-- Other Requisites Container -->
            <div class="glass-panel" style="padding: 1.25rem; background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 255, 255, 0.05); display: flex; flex-direction: column;">
                <h3 style="margin-bottom: 1rem; color: var(--success); font-size: 1.15rem; display: flex; align-items: center; gap: 0.5rem;"><i class='bx bx-check-shield'></i> Other Requisites</h3>
                <div style="display: flex; flex-direction: column; gap: 1rem; flex-grow: 1;">
                    
                    <!-- Module 1 -->
                    <div style="padding: 1rem; background: rgba(255, 255, 255, 0.02); border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.03); flex: 1; display: flex; flex-direction: column;">
                        <h4 style="margin-bottom: 0.75rem; color: var(--success); font-size: 1rem; letter-spacing: 0.05em; text-transform: uppercase;">ADVANCED ICITSS</h4>
                        <div style="flex-grow: 1; min-height: 0;">
                            ${buildCard(reqs[0])}
                        </div>
                    </div>

                    <!-- Module 2 -->
                    <div style="padding: 1rem; background: rgba(255, 255, 255, 0.02); border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.03); flex: 1; display: flex; flex-direction: column;">
                        <h4 style="margin-bottom: 0.75rem; color: var(--success); font-size: 1rem; letter-spacing: 0.05em; text-transform: uppercase;">SPOM</h4>
                        <div style="flex-grow: 1; min-height: 0;">
                            ${buildCard(reqs[1])}
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    `;
    container.innerHTML = html;
    initDatePickers();
}

function getIBSReadinessScore() {
    const ibs = CA_SYLLABUS['IBS'];
    let score = 0;
    ibs.constituents.forEach(c => {
        score += calculateSubjectProgress(c.id) * c.weight;
    });
    return Math.round(score);
}

function renderIBSDashboard() {
    const ibs = CA_SYLLABUS['IBS'];
    const score = getIBSReadinessScore();
    
    let html = `
        <div class="glass-panel" style="margin-bottom: 0; border-left: 4px solid var(--accent-green); background: rgba(16, 185, 129, 0.05); padding: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: nowrap; gap: 1rem;">
                <div>
                    <h3 style="margin: 0; color: var(--accent-green); display: flex; align-items: center; gap: 0.5rem; font-size: 1rem;">
                        <i class='bx bx-network-chart'></i> IBS Readiness Engine
                    </h3>
                    <p style="margin: 4px 0 0 0; font-size: 0.82rem; color: var(--text-secondary);">
                        Calculated in real-time from the progress in the 5 core papers and SPOM sets.
                    </p>
                </div>
                <div style="text-align: right; flex-shrink: 0;">
                    <div style="font-size: 2.2rem; font-weight: 700; color: var(--text-primary); line-height: 1;">${score}%</div>
                    <div style="font-size: 0.65rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px;">Overall Readiness</div>
                </div>
            </div>
            
            <div style="border-radius: 6px; overflow: hidden; border: 1px solid rgba(255,255,255,0.07);">
                <table style="width: 100%; border-collapse: collapse; table-layout: fixed;">
                    <colgroup>
                        <col style="width: 45%;">
                        <col style="width: 12%;">
                        <col style="width: 43%;">
                    </colgroup>
                    <thead>
                        <tr style="background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <th style="padding: 10px 16px; font-weight: 500; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-secondary); text-align: left;">Constituent Subject</th>
                            <th style="padding: 10px 16px; font-weight: 500; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-secondary); text-align: center;">Weightage</th>
                            <th style="padding: 10px 16px; font-weight: 500; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-secondary); text-align: left;">Your Progress</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    ibs.constituents.forEach((c, idx) => {
        let subProgress = 0;
        let subName = '';
        if (c.id === 'SPOM') {
            subProgress = calculateSubjectProgress('SPOM');
            subName = 'SPOM Sets A & B';
        } else {
            subProgress = calculateSubjectProgress(c.id);
            subName = CA_SYLLABUS[c.id].name;
        }
        
        const isLast = idx === ibs.constituents.length - 1;
        const rowBg = idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.15)';
        const barColor = 'var(--success)';
        
        html += `
                        <tr style="background: ${rowBg}; border-bottom: ${isLast ? 'none' : '1px solid rgba(255,255,255,0.04)'};">
                            <td style="padding: 12px 16px; vertical-align: middle;">
                                <div style="font-size: 0.88rem; font-weight: 600; color: var(--text-primary); line-height: 1.2;">${c.id}</div>
                                <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${subName}</div>
                            </td>
                            <td data-label="Weightage" style="padding: 12px 16px; vertical-align: middle; text-align: center;">
                                <span style="display: inline-block; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); padding: 3px 10px; border-radius: 20px; font-size: 0.78rem; font-weight: 600; color: var(--text-primary); margin-left: auto;">${c.weight * 100}%</span>
                            </td>
                            <td data-label="Progress" style="padding: 12px 16px; vertical-align: middle; width: 100%;">
                                <div style="display: flex; align-items: center; gap: 10px; width: 100%;">
                                    <div style="flex: 1; height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden;">
                                        <div style="height: 100%; width: ${subProgress}%; background: ${barColor}; border-radius: 3px; transition: width 0.4s ease;"></div>
                                    </div>
                                    <span style="font-size: 0.8rem; font-weight: 600; min-width: 36px; text-align: right; color: ${subProgress === 100 ? 'var(--success)' : 'var(--text-primary)'}; flex-shrink: 0;">${subProgress}%</span>
                                </div>
                            </td>
                        </tr>
        `;
    });
    
    html += `
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    return html;
}

function renderSubjectView(subjectId) {
    const container = document.getElementById('view-container');
    const subject = CA_SYLLABUS[subjectId];
    const progress = calculateSubjectProgress(subjectId);
    
    let html = `
        <div class="view-header subject-header" style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
            <div style="flex: 1;">
                <h2 style="margin: 0; font-size: 1.8rem; display: flex; align-items: center; gap: 0.8rem;">
                    <i class='bx bx-book-open' style="color: var(--${subject.color === 'blue' ? 'accent-blue' : subject.color === 'purple' ? 'accent-purple' : 'success'});"></i>
                    ${subject.name}
                </h2>
                ${subjectId === 'IBS' ? '' : `
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                    <select class="filter-dropdown" onchange="setAdvancedFilter(this.value, window.filterStatus || 'all', '${subjectId}')" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text-secondary); padding: 6px 12px; border-radius: 4px; font-size: 0.85rem; font-family: var(--font-family); outline: none; cursor: pointer;">
                        <option value="all" style="background: #0d1117;" ${window.filterPhase === 'all' ? 'selected' : ''}>All Phases</option>
                        ${getMetricsForSubject(subjectId).filter(m => m.type !== 'date').map(m => 
                            `<option value="${m.id}" style="background: #0d1117;" ${window.filterPhase === m.id ? 'selected' : ''}>Phase: ${m.label}</option>`
                        ).join('')}
                    </select>
                    
                    <select class="filter-dropdown" onchange="setAdvancedFilter(window.filterPhase || 'all', this.value, '${subjectId}')" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text-secondary); padding: 6px 12px; border-radius: 4px; font-size: 0.85rem; font-family: var(--font-family); outline: none; cursor: pointer;">
                        <option value="all" style="background: #0d1117;" ${window.filterStatus === 'all' ? 'selected' : ''}>Show All Statuses</option>
                        <option value="completed" style="background: #0d1117;" ${window.filterStatus === 'completed' ? 'selected' : ''}>Ticked (Completed)</option>
                        <option value="pending" style="background: #0d1117;" ${window.filterStatus === 'pending' ? 'selected' : ''}>Unticked (Pending)</option>
                    </select>
                    
                    ${subject.group !== 'Req' ? `
                    <div style="display: flex; gap: 4px; margin-left: 0.5rem; align-items: center;">
                        <span style="font-size: 0.8rem; color: var(--text-secondary); margin-right: 4px;">Cat:</span>
                        ${['A', 'B', 'C', 'D', 'E'].map(cat => {
                            let catColor = '#9e9e9e';
                            if (cat === 'A') catColor = '#ff4444';
                            if (cat === 'B') catColor = '#ff9800';
                            if (cat === 'C') catColor = '#4caf50';
                            if (cat === 'D') catColor = '#2196f3';
                            const isActive = window.activeCategories && window.activeCategories.includes(cat);
                            return `
                                <button onclick="toggleCategoryFilter('${cat}', '${subjectId}')" 
                                    style="background: ${isActive ? catColor + '30' : 'transparent'}; 
                                           border: 1px solid ${isActive ? catColor : 'rgba(255,255,255,0.2)'}; 
                                           color: ${isActive ? catColor : 'var(--text-secondary)'}; 
                                           padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; 
                                           font-family: var(--font-family); cursor: pointer; transition: all 0.2s; font-weight: ${isActive ? 'bold' : 'normal'};">
                                    ${cat}
                                </button>
                            `;
                        }).join('')}
                    </div>
                    ` : ''}
                </div>
                `}
            </div>
            <div style="text-align: right;">
                <h3 style="font-size: 2rem; color: var(--${subject.color === 'blue' ? 'accent-blue' : subject.color === 'purple' ? 'accent-purple' : 'success'});">${progress}%</h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">Completion</p>
            </div>
        </div>
        
        </div>
    `;
    
    if (subjectId === 'IBS') {
        html += renderIBSDashboard();
        html += `</div>`;
        container.innerHTML = html;
        return;
    }
    
    html += `
        <div class="chapter-list">
    `;
    
    let renderedCount = 0;
    
    subject.chapters.forEach((_, index) => {
        const chapterName = getChapterName(subjectId, index);
        const metadata = getChapterMetadata(subjectId, index);
        const metrics = getMetricsForChapter(subjectId, index);
        const state = progressData[subjectId][index] || {};
        
        const booleanMetrics = metrics.filter(m => m.type !== 'date');
        
        let shouldShow = true;
        const phase = window.filterPhase || 'all';
        const status = window.filterStatus || 'all';
        const categoryFilter = window.filterCategory || 'all';
        
        if (status !== 'all') {
            if (phase === 'all') {
                let isCompleted = true;
                if (booleanMetrics.length > 0) {
                    booleanMetrics.forEach(m => {
                        if (!state[m.id]) isCompleted = false;
                    });
                } else {
                    isCompleted = false;
                }
                
                if (status === 'completed' && !isCompleted) shouldShow = false;
                if (status === 'pending' && isCompleted) shouldShow = false;
            } else {
                const hasMetric = booleanMetrics.some(m => m.id === phase);
                if (hasMetric) {
                    const isPhaseCompleted = !!state[phase];
                    if (status === 'completed' && !isPhaseCompleted) shouldShow = false;
                    if (status === 'pending' && isPhaseCompleted) shouldShow = false;
                } else {
                    shouldShow = false;
                }
            }
        }
        
        const activeCats = window.activeCategories || [];
        if (activeCats.length > 0) {
            if (!activeCats.includes(metadata.category)) {
                shouldShow = false;
            }
        }
        
        if (!shouldShow) return;
        
        renderedCount++;
        
        if (subject.sections && subject.sections[index] && phase === 'all' && status === 'all' && activeCats.length === 0) {
            html += `
                <div style="margin: 2rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <h3 style="color: var(--${subject.color === 'blue' ? 'accent-blue' : subject.color === 'purple' ? 'accent-purple' : 'success'}); letter-spacing: 0.05em; font-size: 1.1rem; text-transform: uppercase;">
                        ${subject.sections[index]}
                    </h3>
                </div>
            `;
        }
        
        let metaHtml = '';
        if (metadata.category && metadata.marks) {
            let catColor = '#ff4444';
            if (metadata.category === 'A') catColor = '#ff4444'; // Red
            if (metadata.category === 'B') catColor = '#ff9800'; // Orange
            if (metadata.category === 'C') catColor = '#4caf50'; // Green
            if (metadata.category === 'D') catColor = '#2196f3'; // Blue
            if (metadata.category === 'E') catColor = '#9e9e9e'; // Grey

            metaHtml = `
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
                    <span style="background: ${catColor}20; color: ${catColor}; border: 1px solid ${catColor}40; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; letter-spacing: 0.05em;">CAT ${metadata.category}</span>
                    <span style="color: var(--text-secondary); font-size: 0.8rem;"><i class='bx bx-target-lock' style="vertical-align: middle; margin-right: 2px;"></i>Avg Marks: ${metadata.marks}</span>
                </div>
            `;
        }
        
        html += `
            <div class="chapter-item glass-panel" style="display: flex; justify-content: space-between; align-items: center;">
                <div class="chapter-info" style="flex: 1; padding-right: 1rem;">
                    <h4 style="margin: 0; line-height: 1.3; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                        <span>${subject.group === 'Req' ? '' : 'Chapter ' + (index + 1) + ': '}${chapterName}</span>
                        ${subject.group === 'Req' ? '' : getDirectPdfLinksHtml(subject.name, chapterName, index)}
                    </h4>
                    ${metaHtml}
                </div>
                <div class="chapter-actions" style="display: flex; align-items: center; justify-content: ${subjectId === 'ADVANCED_ICITSS' ? 'flex-start' : 'flex-end'}; gap: 1.5rem; flex-shrink: 0; width: ${subjectId === 'ADVANCED_ICITSS' ? '640px' : 'auto'};">
                    ${metrics.map((metric, mIdx) => {
                        const isLast = mIdx === metrics.length - 1;
                        const pushRight = isLast && subjectId === 'ADVANCED_ICITSS' ? 'margin-left: auto;' : '';
                        
                        if (metric.type === 'date') {
                            return `
                                <div class="checkbox-wrapper date-wrapper" style="display: flex; flex-direction: column; align-items: center; width: 140px; flex-shrink: 0; ${pushRight}">
                                    <div style="height: 28px; width: 100%;">
                                        <input type="text" class="custom-date-picker" data-action="subject-date" data-subject="${subjectId}" data-chapter="${index}" data-metric="${metric.id}" value="${state[metric.id] || ''}" placeholder="Select Date" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); color: var(--text-primary); border-radius: 4px; font-family: var(--font-family); font-size: 0.85rem; height: 100%; width: 100%; padding: 0 10px; cursor: pointer; outline: none; text-align: center;">
                                    </div>
                                    <label style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 6px; text-transform: uppercase; letter-spacing: 0.05em;">${metric.label}</label>
                                </div>
                            `;
                        } else {
                            return `
                                <div class="checkbox-wrapper" style="display: flex; flex-direction: column; align-items: center; width: 60px; flex-shrink: 0; ${pushRight}">
                                    <div class="custom-checkbox ${state[metric.id] ? 'checked' : ''}" 
                                         onclick="toggleCheck(this, '${subjectId}', ${index}, '${metric.id}')">
                                        <input type="checkbox" ${state[metric.id] ? 'checked' : ''}>
                                    </div>
                                    <label style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 6px; text-transform: uppercase; letter-spacing: 0.05em; text-align: center;">${metric.label}</label>
                                </div>
                            `;
                        }
                    }).join('')}
                </div>
            </div>
        `;
    });
    
    if (renderedCount === 0) {
        html += `<div class="glass-panel" style="padding: 2rem; text-align: center; color: var(--text-secondary);">No chapters match the current filter.</div>`;
    }
    
    html += `</div>`;
    container.innerHTML = html;
    initDatePickers();
}

function renderScheduleView() {
    const container = document.getElementById('view-container');
    
    let html = `
        <div class="view-header">
            <h2>Exam Schedule for Nov 2026</h2>
        </div>
        
        <div class="glass-panel" style="padding: 0; overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <thead>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2);">
                        <th style="padding: 1rem 1.5rem; color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; font-weight: 600;">Subject</th>
                        <th style="padding: 1rem 1.5rem; color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; font-weight: 600; text-align: center;">Days Left</th>
                        <th style="padding: 1rem 1.5rem; color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; font-weight: 600; text-align: center;">Exam Date</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    const papers = ["FR", "AFM", "Audit", "DT", "IDT", "IBS"];
    const scheduleData = JSON.parse(localStorage.getItem('caFinalSchedule') || '{}');
    
    papers.forEach(subjectId => {
        const subject = CA_SYLLABUS[subjectId];
        const dateValue = scheduleData[subjectId] || '';
        const daysLeft = dateValue ? calculateDaysLeft(dateValue) : '-';
        
        html += `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.2s;">
                <td style="padding: 1rem 1.5rem;" data-label="Subject">
                    <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 0 0 2px 0;">Group ${subject.group}</p>
                    <h4 style="margin: 0; font-size: 1.05rem;">${subject.name}</h4>
                </td>
                <td style="padding: 1rem 1.5rem; text-align: center; vertical-align: middle;" data-label="Days Left">
                    <h3 id="schedule-daysleft-${subjectId}" style="color: var(--accent-blue); font-size: 1.5rem; line-height: 1; margin: 0;">${daysLeft}</h3>
                </td>
                <td style="padding: 1rem 1.5rem; text-align: center; vertical-align: middle;" data-label="Exam Date">
                    <div style="height: 38px; width: 180px; max-width: 100%; margin: 0 auto;">
                        <input type="text" class="custom-date-picker" data-action="schedule-date" data-subject="${subjectId}" value="${dateValue}" placeholder="Select Date" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); color: var(--text-primary); border-radius: 6px; font-family: var(--font-family); font-size: 0.95rem; font-weight: 500; height: 100%; width: 100%; padding: 0 10px; cursor: pointer; outline: none; text-align: center; transition: border-color 0.2s, background 0.2s;">
                    </div>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    container.innerHTML = html;
    initDatePickers();
}

window.updateScheduleDate = function(el, subjectId) {
    const scheduleData = JSON.parse(localStorage.getItem('caFinalSchedule') || '{}');
    scheduleData[subjectId] = el.value;
    localStorage.setItem('caFinalSchedule', JSON.stringify(scheduleData));
    if (db) {
        showSyncing();
        db.ref('userData/schedule').set(scheduleData);
    }
};

function renderMockTestView() {
    const container = document.getElementById('view-container');
    
    let html = `
        <div class="view-header">
            <h2>Mock Tests</h2>
            <p>Subject-wise full syllabus mock test tracking (10% of total subject weight)</p>
        </div>
        
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid var(--accent-blue); padding: 1rem 1.5rem; border-radius: 4px; margin-bottom: 1.5rem; display: flex; align-items: flex-start; gap: 1rem;">
            <i class='bx bx-info-circle' style="color: var(--accent-blue); font-size: 1.5rem; margin-top: 2px;"></i>
            <p style="margin: 0; color: var(--text-primary); font-size: 0.95rem; line-height: 1.5;">
                <strong style="color: var(--accent-blue); font-weight: 600;">Recommendation:</strong> It is highly recommended to take these mock tests at least 2 months prior to your scheduled exams, strictly simulating exact exam conditions.
            </p>
        </div>
        
        <div class="glass-panel" style="padding: 0; overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <thead>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2);">
                        <th style="padding: 1rem 1.5rem; color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; font-weight: 600;">Subject</th>
                        <th style="padding: 1rem 1.5rem; color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; font-weight: 600; text-align: center;">Completed</th>
                        <th style="padding: 1rem 1.5rem; color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; font-weight: 600;">Date Taken</th>
                        <th style="padding: 1rem 1.5rem; color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; font-weight: 600; text-align: center;">Score</th>
                        <th style="padding: 1rem 1.5rem; color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; font-weight: 600; text-align: right;">Overall Progress</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    const standardSubjects = ["FR", "AFM", "Audit", "DT", "IDT", "IBS"];
    const mockData = JSON.parse(localStorage.getItem('caFinalMocks') || '{}');
    let totalScore = 0;
    
    standardSubjects.forEach(subjectId => {
        const subject = CA_SYLLABUS[subjectId];
        const subjMocks = mockData[subjectId] || {};
        const data = subjMocks['mock1'] || { completed: false, date: '', score: '' };
        
        if (data.score && !isNaN(data.score)) {
            totalScore += parseInt(data.score);
        }
        
        html += `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.2s;">
                <td style="padding: 1rem 1.5rem;" data-label="Subject">
                    <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 0 0 2px 0;">Group ${subject.group}</p>
                    <h4 style="margin: 0; font-size: 1.05rem;">${subject.name}</h4>
                </td>
                <td style="padding: 1rem 1.5rem; text-align: center;" data-label="Completed">
                    <div class="custom-checkbox ${data.completed ? 'checked' : ''}" 
                         onclick="toggleMockCheck(this, '${subjectId}', 'mock1')"
                         style="margin: 0 auto;">
                        <input type="checkbox" ${data.completed ? 'checked' : ''}>
                    </div>
                </td>
                <td style="padding: 1rem 1.5rem;" data-label="Date Taken">
                    <div style="height: 36px; width: 140px; max-width: 100%;">
                        <input type="text" class="custom-date-picker" data-action="mock-date" data-subject="${subjectId}" value="${data.date}" placeholder="Select Date" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); color: var(--text-primary); border-radius: 4px; font-family: var(--font-family); font-size: 0.85rem; height: 100%; width: 100%; padding: 0 10px; cursor: pointer; outline: none; text-align: center;">
                    </div>
                </td>
                <td style="padding: 1rem 1.5rem;" data-label="Score">
                    <input type="text" value="${data.score}" onblur="updateMockData('${subjectId}', 'mock1', 'score', this.value)" placeholder="-- / 100" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); color: var(--text-primary); border-radius: 4px; font-family: var(--font-family); font-size: 1rem; height: 36px; width: 80px; text-align: center; outline: none; display: block; margin: 0 auto; transition: border-color 0.2s;">
                </td>
                <td style="padding: 1rem 1.5rem; text-align: right;" data-label="Overall Progress">
                    <h3 id="mock-progress-${subjectId}" style="color: var(--accent-blue); margin: 0; font-size: 1.4rem;">${calculateSubjectProgress(subjectId)}%</h3>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
                <tfoot>
                    <tr style="background: rgba(0,0,0,0.4); border-top: 2px solid rgba(255,255,255,0.1);">
                        <td colspan="3" style="padding: 1rem 1.5rem; text-align: right; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Total Score</td>
                        <td style="padding: 1rem 1.5rem; text-align: center;">
                            <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); color: var(--accent-blue); padding: 8px 12px; border-radius: 6px; font-weight: bold; font-size: 1.1rem; display: inline-block; white-space: nowrap;">
                                <span id="total-score-display">${totalScore}</span> <span style="font-size: 0.8rem; color: var(--text-secondary); font-weight: normal;">/ 600</span>
                            </div>
                        </td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;
    container.innerHTML = html;
    initDatePickers();
}

window.toggleMockCheck = function(el, subjectId, mockId) {
    const isChecked = el.classList.contains('checked');
    if (isChecked) {
        el.classList.remove('checked');
        el.querySelector('input').checked = false;
    } else {
        el.classList.add('checked');
        el.querySelector('input').checked = true;
    }
    updateMockData(subjectId, mockId, 'completed', !isChecked);
};

window.updateMockData = function(subjectId, mockId, field, value) {
    const mockData = JSON.parse(localStorage.getItem('caFinalMocks') || '{}');
    if (!mockData[subjectId]) mockData[subjectId] = {};
    if (!mockData[subjectId][mockId]) mockData[subjectId][mockId] = { completed: false, date: '', score: '' };
    
    mockData[subjectId][mockId][field] = value;
    localStorage.setItem('caFinalMocks', JSON.stringify(mockData));
    if (db) {
        showSyncing();
        db.ref('userData/mocks').set(mockData);
    }
    
    updateOverallProgress();
    
    if (field === 'completed') {
        const progressEl = document.getElementById(`mock-progress-${subjectId}`);
        if (progressEl) progressEl.innerText = calculateSubjectProgress(subjectId) + '%';
    }
    
    if (field === 'score') {
        let newTotal = 0;
        const standardSubjects = ["FR", "AFM", "Audit", "DT", "IDT", "IBS"];
        standardSubjects.forEach(sid => {
            const smocks = mockData[sid] || {};
            const d = smocks['mock1'] || { score: '' };
            if (d.score && !isNaN(d.score)) newTotal += parseInt(d.score);
        });
        const totalEl = document.getElementById('total-score-display');
        if (totalEl) totalEl.innerText = newTotal;
    }
};

// Interactions
window.updateDate = function(el, subjectId, chapterIndex, metricId) {
    if (!progressData[subjectId][chapterIndex]) {
        progressData[subjectId][chapterIndex] = {};
    }
    progressData[subjectId][chapterIndex][metricId] = el.value;
    saveData();
    // Do not call renderSubjectView(subjectId) to prevent popup closure. 
    // The DOM innerText handles the visual update!
};

window.toggleCheck = function(el, subjectId, chapterIndex, metricId) {
    const isChecked = el.classList.contains('checked');
    
    // Toggle UI
    if (isChecked) {
        el.classList.remove('checked');
        el.querySelector('input').checked = false;
    } else {
        el.classList.add('checked');
        el.querySelector('input').checked = true;
    }
    
    // Ensure state object exists
    if (!progressData[subjectId][chapterIndex]) {
        progressData[subjectId][chapterIndex] = {};
    }
    
    // Update State
    progressData[subjectId][chapterIndex][metricId] = !isChecked;
    saveData();
    
    // Re-render header completion percentage smoothly
    const progress = calculateSubjectProgress(subjectId);
    const headerPercentage = document.querySelector('.view-header h3');
    if (headerPercentage) {
        headerPercentage.innerText = `${progress}%`;
    }
};

window.navigateToSubject = function(subjectId) {
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    document.querySelector(`.nav-item[data-subject="${subjectId}"]`).classList.add('active');
    renderSubjectView(subjectId);
};

// Navigation Setup
window.filterPhase = 'all';
window.filterStatus = 'all';
window.activeCategories = [];

window.setAdvancedFilter = function(phase, status, subjectId) {
    window.filterPhase = phase;
    window.filterStatus = status;
    renderSubjectView(subjectId);
};

window.toggleCategoryFilter = function(category, subjectId) {
    if (!window.activeCategories) window.activeCategories = [];
    const idx = window.activeCategories.indexOf(category);
    if (idx > -1) {
        window.activeCategories.splice(idx, 1);
    } else {
        window.activeCategories.push(category);
    }
    renderSubjectView(subjectId);
};

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        const view = item.getAttribute('data-view');
        if (view === 'dashboard') {
            renderDashboard();
        } else if (view === 'subject') {
            window.filterPhase = 'all';
            window.filterStatus = 'all';
            window.activeCategories = [];
            renderSubjectView(item.getAttribute('data-subject'));
        } else if (view === 'mocks') {
            renderMockTestView();
        } else if (view === 'schedule') {
            renderScheduleView();
        }
    });
});

window.initDatePickers = function() {
    setTimeout(() => {
        if (typeof flatpickr !== 'undefined') {
            flatpickr(".custom-date-picker", {
                dateFormat: "Y-m-d",
                altInput: true,
                altFormat: "D, d-M-y",
                disableMobile: "true",
                onChange: function(selectedDates, dateStr, instance) {
                    const el = instance.element;
                    if (el.dataset.action === 'exam-date') {
                        updateExamDate({value: dateStr});
                    } else if (el.dataset.action === 'schedule-date') {
                        updateScheduleDate({value: dateStr}, el.dataset.subject);
                        const daysLeftEl = document.getElementById(`schedule-daysleft-${el.dataset.subject}`);
                        if (daysLeftEl) daysLeftEl.innerText = dateStr ? calculateDaysLeft(dateStr) : '-';
                    } else if (el.dataset.action === 'subject-date') {
                        updateDate({value: dateStr}, el.dataset.subject, el.dataset.chapter, el.dataset.metric);
                    } else if (el.dataset.action === 'mock-date') {
                        updateMockData(el.dataset.subject, 'mock1', 'date', dateStr);
                    }
                }
            });
        }
    }, 50);
};

// Mobile Sidebar Toggle
window.toggleSidebar = function() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
};

// Close sidebar on mobile when a link is clicked
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.sidebar-overlay');
            if (sidebar && overlay) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        }
    });
});

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    if (auth) {
        auth.onAuthStateChanged(user => {
            const overlay = document.getElementById('login-overlay');
            if (user) {
                if (overlay) overlay.style.display = 'none';
                
                // Update role badge
                const isAdmin = user.email === 'arinolf@tracker.com';
                const roleText = isAdmin ? 'ADMIN' : 'WONDERER';
                const roleColor = isAdmin ? 'var(--success)' : 'var(--text-secondary)';
                const badgeHtml = `<span style="font-size: 0.55rem; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,0.1); border: 1px solid ${roleColor}; color: ${roleColor}; margin-left: 0.75rem; font-weight: 600; letter-spacing: 1px; vertical-align: middle;">${roleText}</span>`;
                document.querySelectorAll('.user-role-badge').forEach(el => el.innerHTML = badgeHtml);

                // Hide data management buttons for viewers
                const btnBackup = document.getElementById('btn-backup');
                const btnRestore = document.getElementById('btn-restore');
                if (btnBackup) btnBackup.style.display = isAdmin ? 'flex' : 'none';
                if (btnRestore) btnRestore.style.display = isAdmin ? 'flex' : 'none';

                initData();
                updateOverallProgress();
                renderDashboard();
            } else {
                if (overlay) overlay.style.display = 'flex';
            }
        });
    } else {
        initData();
        updateOverallProgress();
        renderDashboard();
    }
});

// Data Sync Functions
window.exportData = function() {
    const backup = {
        progressData: progressData,
        examDate: localStorage.getItem('caFinalExamDate') || '',
        schedule: JSON.parse(localStorage.getItem('caFinalSchedule') || '{}'),
        mocks: JSON.parse(localStorage.getItem('caFinalMocks') || '{}')
    };
    const dataStr = JSON.stringify(backup, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ca_final_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

window.importData = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (typeof importedData === 'object' && importedData !== null) {
                // Support backwards compatibility
                if (importedData.progressData) {
                    progressData = importedData.progressData;
                    localStorage.setItem('caFinalExamDate', importedData.examDate || '');
                    localStorage.setItem('caFinalSchedule', JSON.stringify(importedData.schedule || {}));
                    localStorage.setItem('caFinalMocks', JSON.stringify(importedData.mocks || {}));
                } else {
                    progressData = importedData;
                }
                
                // Sync ALL data to Firebase at once on import
                if (db) {
                    showSyncing();
                    db.ref('userData').set({
                        progressData: progressData,
                        examDate: localStorage.getItem('caFinalExamDate') || '',
                        schedule: JSON.parse(localStorage.getItem('caFinalSchedule') || '{}'),
                        mocks: JSON.parse(localStorage.getItem('caFinalMocks') || '{}')
                    });
                }
                
                saveData();
                initData();
                
                // Refresh current view
                const activeNav = document.querySelector('.nav-item.active');
                if (activeNav) {
                    const view = activeNav.getAttribute('data-view');
                    if (view === 'dashboard') renderDashboard();
                    else if (view === 'subject') renderSubjectView(activeNav.getAttribute('data-subject'));
                    else if (view === 'schedule') renderScheduleView();
                } else {
                    renderDashboard();
                }
                
                alert("Progress successfully imported! Your data has been synced.");
            } else {
                alert("Invalid data format in the imported file.");
            }
        } catch (error) {
            alert("Error parsing the imported file. Make sure it's a valid JSON progress file.");
        } finally {
            event.target.value = '';
        }
    };
    reader.readAsText(file);
};

window.handleLogin = function() {
    if (!auth) return;
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    const btn = document.getElementById('login-btn');
    const err = document.getElementById('login-error');
    
    if (!email || !pass) {
        err.innerText = "Please enter both email and password.";
        err.style.display = 'block';
        return;
    }
    
    btn.innerText = "Signing in...";
    btn.disabled = true;
    err.style.display = 'none';
    
    auth.signInWithEmailAndPassword(email, pass)
        .then(() => {
            btn.innerText = "Sign In";
            btn.disabled = false;
        })
        .catch(error => {
            err.innerText = error.message;
            err.style.display = 'block';
            btn.innerText = "Sign In";
            btn.disabled = false;
        });
};

window.handleLogout = function() {
    if (auth) {
        auth.signOut().then(() => {
            window.location.reload();
        });
    }
};
