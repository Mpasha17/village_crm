-- Complete SQL Script to Import ALL Venkatapura Household Data
-- Includes ALL Google Form columns
-- Run this in Supabase SQL Editor after running schema_migration.sql

-- First, delete existing Venkatapura households to avoid duplicates
DELETE FROM households WHERE village_id = '9fff07b3-9ad0-47b8-b18c-65c3a828affe';

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '01', 'Mallamma', 'Male', 4,
  ARRAY['9731474856'], ARRAY['Govindaraju  left
Prakash'], ARRAY['No doughter'], ARRAY['Girijamma w/o Govindaraju
Latha w/o prakash'],
  ARRAY['Priyanka D/o Govindaraju'], NULL, NULL, 'Govindaraju son',
  'No', 'Ashwathappa DCC. Mallamma Union bank Post office required', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-18T10:10:41'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '2', 'BHAGYAMMA', 'Male', 6,
  ARRAY['9972979289'], ARRAY['SUNIL V A'], ARRAY['ARUNA LEFT MARRIAGE'], ARRAY['DIVYA M'],
  ARRAY['BHANDVYA D/O SUNIL V A'], NULL, NULL, 'ASHWATHAIAH FAMILY HEAD',
  'No', 'No', ARRAY['No'], ARRAY[]::text[], '2026-01-18T10:31:00'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '3', 'ANGANVADI', 'Male', 0,
  ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[],
  ARRAY[]::text[], NULL, 'https://drive.google.com/open?id=1b0apWDckqu4UEhVpt0Ts04MGTF75ST58', 'Teacher',
  '0', '0', ARRAY['No'], ARRAY[]::text[], '2026-01-18T10:39:48'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '5', 'ANJANAYA TEMPLE', 'Male', 0,
  ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[],
  ARRAY[]::text[], NULL, 'https://drive.google.com/open?id=1zoeZAm0U-741RhvgPvQxYc4jRELHXAa0', 'Temple mangement',
  '0', '0', ARRAY['No'], ARRAY[]::text[], '2026-01-18T10:42:03'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '7', 'LATE MUDDA HANUMAKKA', 'Male', 5,
  ARRAY['9731336404'], ARRAY['LAKSHMINARASAIAH
NARASINHARAJU LEFT'], ARRAY['6 DOUGHTERS LEFT'], ARRAY['M V RADHAMANI  W/O LAKSHMINARASAIAH'],
  ARRAY['SHUBHASHREE D/O LAKSHMINARASAIAH
DISHA V L D/O LAKSHMINARASAIAH'], 'https://drive.google.com/open?id=1wL7VXdQ6RuzyDRKmdkF9xWXgBXbBKgWd', 'https://drive.google.com/open?id=1ghkxLXizOyaX3Y-mJfe4vfeSmNN9_Ali', 'RADHAMANI DOUGHTER IN LAW',
  'O', 'LAKSHMINARASAIAH  Bank credit', ARRAY['IPPB'], ARRAY[]::text[], '2026-01-18T10:55:09'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '8', 'RANGAMMA', 'Male', 5,
  ARRAY['8105885819'], ARRAY['NATARAJ VR S/O RAMANNA V
VISHWANATHAIAH S/O RAMANNA V'], ARRAY['PADMAVATHI D/O RAMANNA V LEFT  MARRIAGE'], ARRAY['MANJAMMA GOVT DUTY'],
  ARRAY['N DAYA SAGAR'], 'https://drive.google.com/open?id=1VfMbZVP79G0soRaFhIZ6ppMmnS9VHQU7', 'https://drive.google.com/open?id=1Fj3yyHHKKoevRXupbK9-fD75b8kl8pUF', 'RANGAMMA',
  'VISHWANATHAIAH S/O RAMANNA V', 'RANGAMMA BANK KARNATAKA BANK', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-18T11:08:34'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '10', 'Late NAGAMMA', 'Male', 2,
  ARRAY['7829358007 7676728859'], ARRAY['Late NAGARAJA URF NAGAPPA DEATH 
NARASIMHPPA 
KOTTAPPA DEATH'], ARRAY['No'], ARRAY['KAMALAMMA W/O Late NAGARAJU
ANNAPURNAMMA W/O NARASIMHPPA
RATHNAMMA W/O  Late KOTTAPPA'],
  ARRAY['KUMARA S/O NARASIMHPPA
KIRAN S/O NARASIMHPPA
RADHA D/O KOTTAPPA LEFT M
ROOPA D/O KOTTAPPA LEFT M
PAVITHRA  D/O KOTTAPPA LEFT M'], 'https://drive.google.com/open?id=1WdfcAQ32ahR5FJsEd-U8UYdq2UOiXyY5', 'https://drive.google.com/open?id=1M22pGnGNRbSVC-4jaQk3b8FFK2kMr8rl', 'RATHNAMMA DOUGHTER IN LAW',
  'KUMARA BANGALORE', 'RATHNAMMA POST', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-18T11:36:40'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '9', 'ANNAPURNAMMA', 'Male', 8,
  ARRAY['9901652347'], ARRAY['KUMARA S/ONARASIMHPPA
KIRAN S/O NARASIMHPPA'], ARRAY['No'], ARRAY['RAMYA W/O KUMARA
KIRAN W/O DIVYA'],
  ARRAY['TANUSHKA D/O KUMARA
JANU S/O KIRAN'], NULL, 'https://drive.google.com/open?id=1GYE0LQNdKJ1y_OYN20hAC69EkHbvh8xM', 'RATHNAMMA',
  'KIRAN BANGALORE', 'No', ARRAY['No'], ARRAY[]::text[], '2026-01-18T11:44:23'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '13', 'LATE HANUMANTHARAYAPPA', 'Male', 3,
  ARRAY['9113574929'], ARRAY['LAKSHMINARAYAN VH
ASHOK KUMAR VH
SOMANATH VH'], ARRAY['No'], ARRAY['JYOTHI W/O  LAKSHMINARAYAN VH

GEETHA W/O ASHOK KUMAR VH

ROOPA  W/O  SOMANATH VH'],
  ARRAY['JEEVITHA V L D/O LAKSHMINARAYAN VH
DUSHANTH S/O  LAKSHMINARAYAN VH'], 'https://drive.google.com/open?id=1T-BxwYc3KApSkO5El9vnRf-ClWHKIpgz', 'https://drive.google.com/open?id=1SazhAbwYc-NvaAHQzuf6iF_4ubgrZV84', 'JYOTHI',
  'ASHOK KUMAR VH
SOMANATH VH', 'NO', ARRAY['Sukanya Samriddhi yojane'], ARRAY[]::text[], '2026-01-18T11:59:24'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '14', 'NAGAMMA', 'Male', 4,
  ARRAY['9141867643'], ARRAY['LATE SANNA NARASAPPA 
UGRAPPA
LATE LAKSHMINARASAPPA'], ARRAY['No'], ARRAY['PADMAVATHAMMA W/O LATE SANNA NARASAPPA

PUTTATHAYAMMA W/O UGRAPPA

VIJAYAMMA W/O LATE LAKSHMINARASAPPA'],
  ARRAY['NARASIMHARAJU S/O LATE SANNA NARASAPPA LEFT
JAYARAMA LATE SANNA NARASAPPA
NAGARAJ LATE SANNA NARASAPPA'], 'https://drive.google.com/open?id=1YTsOE6Qj2Zptd_2Kf3xExjTRl-eAO_ey', 'https://drive.google.com/open?id=15Nhw7TPVGB-A6M3Mbp6iVUul-1Qun09G', 'NAGARAJU SON',
  'NARASIMHARAJU S/O LATE SANNA NARASAPPA BANGALORE', 'NAGAMMA DCC PADMAVATHAMMA SBI', ARRAY['SB RPLI'], ARRAY[]::text[], '2026-01-18T12:15:38'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '15', 'MALAMMA', 'Male', 4,
  ARRAY['8693930237'], ARRAY['GOVINDARAJU
BHANUPUTHRA'], ARRAY['LAKSHMAMMA MARRIAGE CN DURGA
SHARADAMMA MARABALLI
NETRAVATHI DEATH'], ARRAY['No'],
  ARRAY['No'], 'https://drive.google.com/open?id=1Qr0vpB_33iP7ln3SXAi3JY2XbHlCTo8F', 'https://drive.google.com/open?id=1x0_x69eX6qiHqXfTF3cMgSQc3JHet57G', 'Narasappa',
  'Govindaraju mysore', 'Narasappa post MALAMMA SBI required post', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-18T12:24:13'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '16', 'LATE THIMAKKA', 'Male', 6,
  ARRAY['6364158838'], ARRAY['HANUMANTHARAYAPPA  LEFT V
CHIKKAHANUMAIAH PRESENT 
ASHWATHNARAYANAPPA LEFT V'], ARRAY['HANUMAKKA  LEFT M
LAKSHMINARASAMMA LEFT M
LAKSHMAMMA DEATH'], ARRAY['GANGAMMA W/O HANUMANTHARAYAPPA LEFT V

GANGAMMA W/O CHIKKAHANUMAIAH PRESENT 

RATHNAMMA W/O ASHWATHNARAYANAPPA LEFT V'],
  ARRAY['RAVICHANDRA S/O CHIKKAHANUMAIAH
LAKAHMINARAYANA S/O  CHIKKAHANUMAIAH

BHAVYA M W/O RAVI CHANDRA
RIHANA A W/O LAKSHMINARAYANA'], 'https://drive.google.com/open?id=108B5OpTX-elc4kb45_2wHXSKhvrKLCU3', 'https://drive.google.com/open?id=1vqT657V9qrwiMyL2Wjh8q_KgO0CBgGzV', 'CHIKKAHANUMAIAH',
  'RAVICHANDRA S/O CHIKKAHANUMAIAH
LAKAHMINARAYANA S/O  CHIKKAHANUMAIAH', 'No', ARRAY['No'], ARRAY[]::text[], '2026-01-18T12:43:13'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '18', 'SAVITHA', 'Male', 3,
  ARRAY['9019940817'], ARRAY['ARYAN GOWDA V'], ARRAY['No'], ARRAY['No'],
  ARRAY['No'], 'https://drive.google.com/open?id=1piez2G3GatL_wFK5_11TJt1akBEbNLXd', 'https://drive.google.com/open?id=1Y-69SqTISB-bGeLm8dhZhXzUN-iJwkXq', 'SAVITHA T',
  'No', 'No', ARRAY['RD Account'], ARRAY[]::text[], '2026-01-18T12:49:56'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '19', 'RATHNAMMA', 'Male', 3,
  ARRAY['7760799721'], ARRAY['NAVEENKUMAR
ANANTHARAJU LEFT V18'], ARRAY['No'], ARRAY['SAVITHA W/O ANANTHARAJU LEFT V18'],
  ARRAY['LEFT V18'], 'https://drive.google.com/open?id=1bXJ-pc4DMO3BjJWhn_JLKjsyuSF4ujOl', 'https://drive.google.com/open?id=1Is4XnY0kkYv2URaXFJzwLNnirTw7Drm0', 'ASHWATHANARAYANA',
  'No', 'No', ARRAY['No'], ARRAY[]::text[], '2026-01-18T12:58:12'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '20', 'RATHNAMMA', 'Male', 3,
  ARRAY[]::text[], ARRAY['VASANTHAKUMAR V E 

CHANDRASHEKAR'], ARRAY['CHAYA LEFT'], ARRAY['SHAILAJA W/O CHANDRASHEKAR LEFT
MEGHANA T W/O VASANTHKUMAR  V E LEFT'],
  ARRAY['No'], NULL, 'https://drive.google.com/open?id=1j2wgaWNgcVb6TBkFasnzWZpmOK2e-pUQ', '19 house',
  'Bangalore MADHUGIRI', 'No', ARRAY['No'], ARRAY[]::text[], '2026-01-18T13:03:45'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '21', 'LATE RATHNAMMA', 'Male', 3,
  ARRAY['9380515077'], ARRAY['LATE ANANTHARAJU'], ARRAY['BHAGYAMMA W/O LATE KANTHAPPA

HANUMAKKA WATERMAN WIFE VENKATAPURA'], ARRAY['NO'],
  ARRAY['VEERUPAKSHA S/O KANTHAPPA

CHAITHRA D/O KANTHAPPA LEFT'], 'https://drive.google.com/open?id=14ifVLUihfjNJRRS0zufZpNDjNuHxq0uY', 'https://drive.google.com/open?id=1vclG8AZiO8Kffh1TP11OI_Npqw_nKpLq', 'BHAGYAMMA',
  'No', 'BHAGYAMMA KAVERI BANK', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-18T13:14:31'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '22', 'LAKSHMIDEVAMMA', 'Male', 4,
  ARRAY['8152936774'], ARRAY['NARASIMHARAJU P
SHIVAKUMAR
PRABHAKAR
ANANTHRAJU'], ARRAY['RADHAMMA LEFT M'], ARRAY['BHAGYAMMA K W/O NARASIMHARAJU P
MANJULA W/O SHIVAKUMAR
TEJASVINI CK W/O PRABHAKAR
PAVITHRA W/O ANANTHARAJU'],
  ARRAY['VIDYASHREE D/O NARASIMHARAJU P
PRAJVAL S/O NARASIMHARAJU P'], 'https://drive.google.com/open?id=1ewAS-uH4Z1QQ8Yz2QGo5NJpXuNI9TWXY', 'https://drive.google.com/open?id=1RT_UnjM-wcq2mNEDedMSpE6jkJqvatLe', 'NARASIMHARAJU P',
  'No', 'No', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-18T13:24:36'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '23', 'MEENAKSHAMMA', 'Male', 4,
  ARRAY['7259888249'], ARRAY['KHUSHVANTH V R

MANU V R'], ARRAY['No'], ARRAY['No'],
  ARRAY['No'], 'https://drive.google.com/open?id=1XA5ECfgfHvBD2v5UMtBxYDwLBXl-Lp51', 'https://drive.google.com/open?id=1qbFeEidvZ2M0kggk-yjlnvynHdEZDMkQ', 'MEEENAKSHAMMA',
  'No', 'No', ARRAY['No'], ARRAY[]::text[], '2026-01-18T13:30:57'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '24', 'LATE ANJIMAPPA', 'Male', 3,
  ARRAY['9986706155'], ARRAY['HANUMANTHARAYAPPA
RAGHVENDRA'], ARRAY['No'], ARRAY['GANGAMANI W/O HANUMANTHARAYAPPA
MEENAKSHAMMA W/O RAGHVENDRA'],
  ARRAY['LAYASRI D/O HANUMANTHARAYAPPA
DEEPIKA D//O HANUMANTHARAYAPPA'], 'https://drive.google.com/open?id=1Rdv_aBVwxHQLXFV2I1H2LFl7SLdOOZbQ', 'https://drive.google.com/open?id=1zaZnESoQBEhwtV8Goy7CWZhSOYF84Q6u', 'DEEPIKA',
  'No', 'No', ARRAY['No'], ARRAY[]::text[], '2026-01-18T13:38:44'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '25', 'CHIKKA RANGMMA', 'Male', 4,
  ARRAY['7760632889'], ARRAY['RAMESH 
HARISH H'], ARRAY['No'], ARRAY['KAVITHA W/O RAMESH
SHYLAJA H R W/O HARISH H'],
  ARRAY['DHANUSH R S/O RAMESH
SUHBASH R  S/O RAMESH
CHIRANJEEVI H S/O HARISH H
VEHANTH S/O HARISH H'], 'https://drive.google.com/open?id=1V1Vy4OOtX-P1RTQ5zW8Thxsn4G2eXB-e', 'https://drive.google.com/open?id=1e9p4nyTRoqoHe57Xmho-FAMsciiHK8ms', 'KAVITHA',
  'RAMESH HARISH FAMILY LEFT BANGALORE', 'No', ARRAY['No'], ARRAY[]::text[], '2026-01-18T13:50:29'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '26', 'KAVALAMMA', 'Male', 2,
  ARRAY['9108204303'], ARRAY['RAJESH'], ARRAY['RADHIKA LEFT M'], ARRAY['No'],
  ARRAY['No'], NULL, 'https://drive.google.com/open?id=1xGTpPi-O2Ltb9DD5sC0qb9XIpfL61O13', 'RADHIKA',
  'No', 'Post', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-18T13:54:52'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '27', 'LATE HANUMAKKA', 'Male', 4,
  ARRAY['8197910448'], ARRAY['RAMANJANEYA
SHIVANNA VR
SRIRAMA'], ARRAY['No'], ARRAY['SAVITHRAMMA W/O RAMANJANEYA
GOWRAMMA W/O SHIVANNA VR
ANITHA W/O SRIRAMA'],
  ARRAY['CHETHANA VR S/O  RAMANJANEYA
PALLAVI VR D/O RAMANJANEYA'], 'https://drive.google.com/open?id=1VZVYSJNRIy3V15_7NR_wLkwcWueGrf7b', 'https://drive.google.com/open?id=11AmHmLXThv99zpPZsMmm7WLWruSaVZ-H', 'RAMANJANEYA',
  'SHIVANNA VR
SRIRAMA.  Bangalore', 'No', ARRAY['No'], ARRAY[]::text[], '2026-01-18T14:04:25'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '28', 'GOWRAMMA', 'Male', 6,
  ARRAY['8197910448'], ARRAY['JEEVAN VS'], ARRAY['Sudha'], ARRAY['No'],
  ARRAY['SRIRAMA S/O RANGAPPA
ANITHA S/o SRIRAMA'], NULL, 'https://drive.google.com/open?id=1JtFI3nfeJH0aYVUVnMfs54T11p88CEkw', 'No',
  'LEFT BANGALORE', 'No', ARRAY[]::text[], ARRAY[]::text[], '2026-01-18T14:09:37'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '29', 'House 29', 'Unknown', 0,
  ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[],
  ARRAY[]::text[], NULL, 'https://drive.google.com/open?id=1D-n1hxfdyiDRLPrsm2LKxZmDxZ1dJp68', NULL,
  NULL, NULL, ARRAY[]::text[], ARRAY[]::text[], '2026-01-18T14:11:47'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '30', 'SHANTHAMMA', 'Male', 4,
  ARRAY['9964184785'], ARRAY['LAKSHMINARAYANA
MADHUSUDAN'], ARRAY['JAYALAKSHMAMMA LEFT M
ANUSUYA LEFT M'], ARRAY['V R PADMAVATHI W/O LAKSHMINARAYANA
NANDINI W/O MADHUSUDAN'],
  ARRAY['DEEPASHREE L D/O LAKSHMINARAYANA
V L GUNA SHREE D/O LAKSHMINARAYANA'], 'https://drive.google.com/open?id=1zH8sSj3OkXKlbARLiv9OxDhJZORvJwlf', 'https://drive.google.com/open?id=1KW56pID3rs2aS115nYeKqDvJIb0d0s-k', 'PADMAVATHI VR',
  'MADHUSUDAN LEFT BANGALORE', 'No', ARRAY['Sukanya Samriddhi yojane'], ARRAY[]::text[], '2026-01-18T14:26:07'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '29', 'SANNA NARASAMMA', 'Male', 5,
  ARRAY['7259146395'], ARRAY['2'], ARRAY['LALITHAMMA LEFT M'], ARRAY['MAMATHA W/O NAGENDRA LEFT DIVORCE'],
  ARRAY['DEEPAK S/O NAGENDRA'], 'https://drive.google.com/open?id=1FKsq2cct8TfWqYp3o4ePZTXSU07nr_qc', 'https://drive.google.com/open?id=16RC7bkaVxfLx1DJC_Po34dM8EYwgU1QO', 'NAGENDRA',
  'No', 'Bank DCC', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-23T11:44:59'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '31', 'LAKSHMAMMA', 'Male', 3,
  ARRAY['9964275808'], ARRAY['NAGABOSHANA V N'], ARRAY['No'], ARRAY['NO'],
  ARRAY['No'], 'https://drive.google.com/open?id=1fUlLX7as8io1713N9BOXzeryDHU6y6QQ', 'https://drive.google.com/open?id=1OB63YycDYJXoXzZAiyhRBy1H-HvSE4Wh', 'LAKSHMAMMA',
  'NO', 'Post', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-23T11:51:44'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '32', 'LATE SANNA NARASAMMA', 'Male', 6,
  ARRAY['9739621629'], ARRAY['RANGANATH VK S/O KARIYANNA
THIPPESH VK S/O KARIYANNA LEFT S'], ARRAY['KAMALAMMA D/O KARIYANNA LEFT M
RENUKAMMA D/O KARIYANNA LEFT M'], ARRAY['NAGAMMA W/O RANGANATH VK 
NAGARATHNAMMA W/O THIPPESH VK LEFT M
KAVYASHREE G H W/O BHARAH'],
  ARRAY['BHARATH S/O RANGANATH VK
SRIVASTHA S/O THIPPESH VK
ADARSH S/O THIPPESH VK
TUSHAR B GOWDA S/O BHARATH'], 'https://drive.google.com/open?id=1C4tnOt6jyBk4T7l_uHfCYTNh9zmPAukM', 'https://drive.google.com/open?id=1pQRU5wntLiDQJ_toxLcIjk6K8bBDfDnm', 'KAVYASHREE G H',
  'No', 'No', ARRAY['RD Account'], ARRAY[]::text[], '2026-01-23T12:04:57'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '33', 'THIMA JAYAMMA', 'Male', 3,
  ARRAY['8971225484'], ARRAY['CHANDRAKANTHA S/O SANNA NARASAPPA
GOVINDARAJU S/O SANNA NARASAPPA LEFT BG'], ARRAY['PARVATHAMMA LEFT M'], ARRAY['GEETHA W/O CHANDRAKANTHA LEFT BG
MANJAMMA W/O GOVINDARAJU LEFT BG'],
  ARRAY['Preethi D/O GOVINDARAJU
SRINIDHI D/O GOVINDARAJU'], 'https://drive.google.com/open?id=186ilMiMY7Boy-aq5m41pNZglxp0ehE1H', 'https://drive.google.com/open?id=1FLFWzfuYbSnHO7vwrOLCxKQKBpDo0fvG', 'SANNA NARASAPPA',
  'TWO SOND LEFT BG', 'DCC', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-23T12:15:26'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '35', 'LATE CHIKKA RAMAKKA', 'Male', 3,
  ARRAY['9113670711'], ARRAY['RANGAPPA S/O LATE PUTTA RANGAPPA
MANJUNATH  S/O LATE PUTTA RANGAPPA LEFT S
RAMANNA S/O LATE PUTTA RANGAPPA LEFT S'], ARRAY['3 NO DETAILS'], ARRAY['SAVITHRAMMA W/O RANGAPPA
LAKSHMAMMA W/O MANJUNATH'],
  ARRAY['Abhilash V R D/O RANGAPPA'], 'https://drive.google.com/open?id=1yrqGVkIL17Jg9II9grGfsP7zT-4K8XzO', 'https://drive.google.com/open?id=1Ui5R7kdPd1yJPHaM-28ZyjnULjHqt4cG', 'ABHILASH VR',
  'No', 'No', ARRAY['No'], ARRAY[]::text[], '2026-01-23T12:32:27'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '36', 'RANGA LAKSHMAMMA', 'Male', 3,
  ARRAY['+918970330314'], ARRAY['SIDDARAJU S/O RANGADHAMAIAH
SOMASHEKARAIAH D R S/O RANGADHAMAIAH'], ARRAY['No'], ARRAY['BHAVYA w/o SOMASHEKARAIAH D R'],
  ARRAY['SUJAN S/O SOMASHEKARAIAH D R'], 'https://drive.google.com/open?id=1kEeGSdOWg32sCavb1Rh7MCV9wVn9r6BY', 'https://drive.google.com/open?id=1tGMRk02Ix383Uh_RIQ_-CMJ0GKFQW5fB', 'RANGA LAKSHMAMMA',
  'No', 'SBI', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-23T12:44:16'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '37', 'LATE NAGAMMA', 'Male', 3,
  ARRAY['8147340448'], ARRAY['LAKSHMAIAH S/O UGRAPPA JJM- 38
NARASAIAH S/O UGRAPPA 
SHIVAKUMAR S/O UGRAPPA JJM- -43'], ARRAY['KAMAKASHMAMMA LEFT M'], ARRAY['SAKKAMMA W/O LAKSHMAIAH LEFT S
NALINA V W/O NARASAIAH
BHAGYAMMA W/O SHIVAKUMAR LEFT S'],
  ARRAY['HONNESH V N S/O NARASAIAH
NAGASHREE D/O SHIVAKUMAR
CHETHANA S/O SHIVAKUMAR'], 'https://drive.google.com/open?id=1Wz3wlxhsxzp-TLi8RdTgiO8JMbuM5JcU', 'https://drive.google.com/open?id=1N8y0Mt7dMwS6N88Ajg_FmhvjMihp5NME', 'Nalina',
  'Shivakumar BANGALORE LEFT', 'No', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-23T12:56:34'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '38', 'SAKAMMA', 'Male', 4,
  ARRAY['8746835104'], ARRAY['LAKSHMIKANTHA'], ARRAY['GEETHA LEFT M
GAYITHRI LEFT M'], ARRAY['BHAGYAMMA W/O LAKSHMIKANTHA'],
  ARRAY['PARINITHA D/O LAKSHMIKANTHA'], NULL, 'https://drive.google.com/open?id=1er3lcT3SpZ-PAfSVG9Z_67MYKs3HwadO', 'Nalina',
  'Bangalore left son', 'BAnk', ARRAY['No'], ARRAY[]::text[], '2026-01-23T13:02:47'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '34', 'KAMAKAHMAMMA', 'Male', 5,
  ARRAY['9141619150'], ARRAY['MANJUNATH'], ARRAY['NALINA LEFT M'], ARRAY['LOKAMMA W/MANJUNATH'],
  ARRAY['RISHITHA GOWDA D/O MANJUNATH
REVANTH GOWDA S/O MANJUNATH'], NULL, 'https://drive.google.com/open?id=1FTxnSQVDxKzNcN_N5NE4A9LubjPIXS_A', 'NALINA',
  'LEFT MADHUGIRI MANJUNATH', 'Bank', ARRAY['No'], ARRAY[]::text[], '2026-01-23T13:08:13'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '11', 'PUTTANARSAMMA', 'Male', 4,
  ARRAY['9141318298'], ARRAY['HANUMANTHARAYAPPA 
NAGESH
RAVI KEMAR'], ARRAY['NO'], ARRAY['RATHNAMMA W/O HANUMANTHARAYAPPA LEFT S
LATHAMMA W/O NAGESH JJM 6
LAKSHMAMMA W/O RAVI KUMAR JJM 11'],
  ARRAY['ARJUNA S/O HANUMANTHARAYAPPA  LEFT 
ANIL S/O NAGESH
HEMASHREE V R'], 'https://drive.google.com/open?id=1dZs460NpD932GITJU7LSbHhZKEOrrcf3', 'https://drive.google.com/open?id=10fiRvwCHjfFu4C9kWOhEOxrr-bOaXZlt', 'RAVIKUMAR',
  'BANGALORE HANUMANTHARAYAPPA', 'BANK DCC', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-25T09:26:06'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '20 A', '20', 'Male', 20,
  ARRAY['20'], ARRAY['20'], ARRAY['20'], ARRAY['20'],
  ARRAY['20'], NULL, 'https://drive.google.com/open?id=1X_gKLJFEAo7pY3HkqjgxcLXw1wyxmYQW', '20',
  '20', '20', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-25T09:35:28'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '40', 'RATHNAMMA', 'Male', 4,
  ARRAY['8970402016'], ARRAY['RAGHU VEERA'], ARRAY['PUSHPALATHA'], ARRAY['No'],
  ARRAY['CHIKKA RANGAPPA S/O ERAPPA  BROTHER JJM 39'], 'https://drive.google.com/open?id=1G_OljSnO2nRy7xIU2pwaKS5ZDYO1nrwH', 'https://drive.google.com/open?id=1zwIw739ui_WqvoocUlPpqHSD7Do-f8vy', 'PUSHPALATHA',
  'No', 'Post', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-25T09:43:39'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '41', 'RANGAMMA', 'Male', 4,
  ARRAY['8496842260'], ARRAY['RAMESHA V R'], ARRAY['RAMYA'], ARRAY['No'],
  ARRAY['No'], 'https://drive.google.com/open?id=1HO1rD9nqvbu38bf8rs7JDV0B_IPC7sOK', 'https://drive.google.com/open?id=10poiXx0Wkn7YeRJqCC7FYLOTtC261Hau', 'RAMACHANDRAIAH',
  'NO', 'No', ARRAY['No'], ARRAY[]::text[], '2026-01-25T09:51:27'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '42', 'PUTTAMMA', 'Male', 4,
  ARRAY['9535337957'], ARRAY['DHANANJYA V N'], ARRAY['POOJA N'], ARRAY['No'],
  ARRAY['No'], 'https://drive.google.com/open?id=1yQbkgvQ5PnLSV-MZjsNGPQe6k6nvG6p5', 'https://drive.google.com/open?id=1tzygxtf8d08dMgAXGYD6Ll7WOQ0Mhk6l', 'NARASIMHAMURTHY',
  'No', 'Post', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-25T09:58:54'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '43', 'LATE PUTTAMALAMMA', 'Male', 4,
  ARRAY['7899884076'], ARRAY['DASARAJU S/O DASAPPA
NARASIMHAMURTHY S/O DASAPPA'], ARRAY['NARASAMMA D/O LATE DASAPPA LEFT M'], ARRAY['LAKSHMI NARASAMMA W/O DASARAJU'],
  ARRAY['GURUPRASAD S/O DASARAJU 
YASHWANT S/O DASARAJU'], NULL, 'https://drive.google.com/open?id=1Mu_UNXsF_lnXlh2-msU88BI_2q9f4A7P', 'NARASIMHAMURTHY',
  'No', 'No', ARRAY['No'], ARRAY[]::text[], '2026-01-25T10:04:27'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '44', 'NAGARAPPA', 'Male', 0,
  ARRAY[]::text[], ARRAY['NAGARAPPA'], ARRAY[]::text[], ARRAY[]::text[],
  ARRAY[]::text[], NULL, 'https://drive.google.com/open?id=1X6aPQ0dIOs7v9WU1ydpxNY5uiFL-W2FK', NULL,
  NULL, NULL, ARRAY[]::text[], ARRAY[]::text[], '2026-01-25T10:07:39'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '45', 'LATE GANGAMMA', 'Male', 5,
  ARRAY['8867035382'], ARRAY['MARUTHI S/HANUMANTHARAYAPPA'], ARRAY['CHETHANA D/O HANUMANTHARAYAPPA LEFT M'], ARRAY['LAVANYA R W/O MARUTHI'],
  ARRAY['DRUVANTH V M S/O MARUTHI
LASYA S/O MARUTHI'], 'https://drive.google.com/open?id=1bk1Elo1v1XQL9sWEa3dst8bWAvzx0Lnr', 'https://drive.google.com/open?id=1W3KUn5g4AC5Up0B716CsQhjaOfYEFeeY', 'HANUMANTHARAYAPPA',
  'No', 'BANK SBI', ARRAY['SB Account'], ARRAY[]::text[], '2026-01-25T10:17:07'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '45', 'JJM 37', 'Male', 0,
  ARRAY['JJM 37'], ARRAY['JJM 37'], ARRAY[]::text[], ARRAY[]::text[],
  ARRAY[]::text[], NULL, 'https://drive.google.com/open?id=1Brp0oXQaRBx455iFJqinMPqmPPLkbRU1', NULL,
  NULL, NULL, ARRAY[]::text[], ARRAY[]::text[], '2026-01-25T10:19:13'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '47', 'KAVITHA', 'Male', 4,
  ARRAY['9901069138'], ARRAY['VISHNU V A'], ARRAY['NAMITHA V A'], ARRAY['No'],
  ARRAY['No'], 'https://drive.google.com/open?id=127xNgK2t6axvYbZn5EbKDXuMB1N7QQoQ', 'https://drive.google.com/open?id=1n6IJc8pNKV_qtOQPQhBFZvvEzIyhuR1q', 'ANANTHARAJU',
  'No', 'No', ARRAY['No'], ARRAY[]::text[], '2026-01-25T10:26:25'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '48', 'PUTTANARASAMMA', 'Male', 3,
  ARRAY['7899996486'], ARRAY['KHUSHAL'], ARRAY['NAGAMANI D/O NAGARAJU LEFT M'], ARRAY['No'],
  ARRAY['No'], NULL, 'https://drive.google.com/open?id=1Agabm5TZqTTvEebxFy0RBWCt68KedFKL', 'KHUSHAL',
  'No', 'No', ARRAY['No'], ARRAY[]::text[], '2026-01-25T10:32:27'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '50', 'BHAGYALAKSHMI W/O NAGENDRAPPA', 'Male', 4,
  ARRAY['JJM 54'], ARRAY['KISHORE'], ARRAY['Thanu'], ARRAY[]::text[],
  ARRAY[]::text[], NULL, 'https://drive.google.com/open?id=1cjN2wOjcjBxuJFYWid9rDCucIr3rFQXf', NULL,
  NULL, NULL, ARRAY[]::text[], ARRAY[]::text[], '2026-01-25T10:38:38'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '51', 'LAKSHMIDEVAMMA', 'Male', 4,
  ARRAY['9035802311'], ARRAY['RAMACHANDRA V K'], ARRAY['KALPANA D/O HANUMANTHARAYAPPA LEFT M'], ARRAY['SUJATHA W/O RAMACHANDRA V K'],
  ARRAY['No'], 'https://drive.google.com/open?id=1ZKMPh_wqfnJi-s199WAPMHeW3FlO2SP9', 'https://drive.google.com/open?id=17uO2tXF5l-strKbomX358jT00CeMRrjl', 'RAMACHANDRA',
  'No', 'N9', ARRAY['No'], ARRAY[]::text[], '2026-01-25T10:45:22'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '52', 'LALITHAMMA', 'Male', 9,
  ARRAY['9141323867'], ARRAY['JAYARAMA V J S/O JULLAPPA
SHIVARAJU V J S/O JULAPPA'], ARRAY['YASHODA D/O JULAPPA LEFT M
SUNDRAMMA D/O JULAPPA LEFT M'], ARRAY['CHANDRAKALA W/O JAYARAMA VJ
PREETHI W/O SHIVARAJU V J'],
  ARRAY['Dimpana V J D/O JAYARAMA V J
JEEVAN S/O SHIVARAJU V J'], NULL, 'https://drive.google.com/open?id=1Xm1rMUb9HpsEGiJTLYnUGy5LaaarrHo2', 'CHANDRIKALA',
  'SHIVARAJU VJ BG LEFT', 'BANK', ARRAY['BANK'], ARRAY[]::text[], '2026-01-25T10:53:09'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '53', 'PALU', 'Male', 0,
  ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[],
  ARRAY[]::text[], NULL, 'https://drive.google.com/open?id=1qhTJ9YPANLyRvKF7KlDhb9E8K_-dln6L', NULL,
  NULL, NULL, ARRAY[]::text[], ARRAY[]::text[], '2026-01-25T10:55:22'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '54', 'LALITHAMMA', 'Male', 2,
  ARRAY['9141323867'], ARRAY['NO'], ARRAY['BHAGYALAKSHMI
MAMATHA
KAVYASHREE
GUNA'], ARRAY[]::text[],
  ARRAY[]::text[], NULL, 'https://drive.google.com/open?id=1QfhHYM6a84zaU-_dk3bC2DCPF5mDScjE', 'JULAPPA BROTHER',
  NULL, NULL, ARRAY[]::text[], ARRAY[]::text[], '2026-01-25T10:59:49'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '58', 'SHANTHAMMA', 'Male', 3,
  ARRAY['9164197071'], ARRAY['PRASHANTH KUMAR'], ARRAY['SHRUTHI'], ARRAY['No'],
  ARRAY['No'], 'https://drive.google.com/open?id=1-ZAxu4nmNUfEP3OyFyzskyNSoJsngAgV', 'https://drive.google.com/open?id=10L5uL8StET-ik0OIwygHNz634_Zn-Qa8', 'SHANTHAMMA',
  'No', 'No', ARRAY['BANK'], ARRAY[]::text[], '2026-01-25T11:06:24'
);

INSERT INTO households (
  village_id, house_number, head_name, head_gender, family_members_count,
  mobile_numbers, sons_names, daughters_names, daughter_in_law_names,
  grandchildren_names, ration_card_status, photo_url, notes,
  immigration_details, pensioner_info, postal_schemes, schemes, submission_timestamp
)
VALUES (
  '9fff07b3-9ad0-47b8-b18c-65c3a828affe', '57', 'RANGAMMA', 'Male', 1,
  ARRAY[]::text[], ARRAY['NAGARAJU S/O MALDI RANGAPPA'], ARRAY['No'], ARRAY['ASHWATHAMMA W/O NAGARAJU'],
  ARRAY['RADHA D/O NAGARAJU'], NULL, 'https://drive.google.com/open?id=1NIjzoqEkREJ9UXRVhXBykOtqqaYjfnFi', NULL,
  NULL, NULL, ARRAY['No'], ARRAY[]::text[], '2026-01-25T11:13:39'
);

-- Total: 52 households with ALL columns imported
-- ✅ All 17 Google Form fields are now in the database!
