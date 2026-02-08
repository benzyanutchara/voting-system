/**
 * Mock Data สำหรับ Voting System
 * ใช้แสดงข้อมูลได้ทุกหน้าแม้ไม่มี Backend
 */

// ===================== เขตเลือกตั้ง (Constituencies) =====================
export const mockConstituencies = [
  // กรุงเทพมหานคร
  { id: 1, province: "กรุงเทพมหานคร", name: "เขตพระนคร", district_number: 1, status: "open" },
  { id: 2, province: "กรุงเทพมหานคร", name: "เขตดุสิต", district_number: 2, status: "open" },
  { id: 3, province: "กรุงเทพมหานคร", name: "เขตหนองจอก", district_number: 3, status: "open" },
  { id: 4, province: "กรุงเทพมหานคร", name: "เขตบางรัก", district_number: 4, status: "open" },
  { id: 5, province: "กรุงเทพมหานคร", name: "เขตบางเขน", district_number: 5, status: "open" },
  { id: 6, province: "กรุงเทพมหานคร", name: "เขตบางกะปิ", district_number: 6, status: "open" },
  { id: 7, province: "กรุงเทพมหานคร", name: "เขตปทุมวัน", district_number: 7, status: "open" },
  { id: 8, province: "กรุงเทพมหานคร", name: "เขตป้อมปราบศัตรูพ่าย", district_number: 8, status: "open" },
  { id: 9, province: "กรุงเทพมหานคร", name: "เขตพระโขนง", district_number: 9, status: "open" },
  { id: 10, province: "กรุงเทพมหานคร", name: "เขตมีนบุรี", district_number: 10, status: "open" },
  // เชียงใหม่
  { id: 11, province: "เชียงใหม่", name: "อำเภอเมืองเชียงใหม่", district_number: 1, status: "open" },
  { id: 12, province: "เชียงใหม่", name: "อำเภอจอมทอง", district_number: 2, status: "open" },
  { id: 13, province: "เชียงใหม่", name: "อำเภอแม่แจ่ม", district_number: 3, status: "open" },
  { id: 14, province: "เชียงใหม่", name: "อำเภอเชียงดาว", district_number: 4, status: "open" },
  { id: 15, province: "เชียงใหม่", name: "อำเภอดอยสะเก็ด", district_number: 5, status: "open" },
  // นครราชสีมา
  { id: 16, province: "นครราชสีมา", name: "อำเภอเมืองนครราชสีมา", district_number: 1, status: "open" },
  { id: 17, province: "นครราชสีมา", name: "อำเภอครบุรี", district_number: 2, status: "open" },
  { id: 18, province: "นครราชสีมา", name: "อำเภอเสิงสาง", district_number: 3, status: "open" },
  { id: 19, province: "นครราชสีมา", name: "อำเภอคง", district_number: 4, status: "open" },
  { id: 20, province: "นครราชสีมา", name: "อำเภอบ้านเหลื่อม", district_number: 5, status: "open" },
  // ขอนแก่น
  { id: 21, province: "ขอนแก่น", name: "อำเภอเมืองขอนแก่น", district_number: 1, status: "open" },
  { id: 22, province: "ขอนแก่น", name: "อำเภอบ้านฝาง", district_number: 2, status: "open" },
  { id: 23, province: "ขอนแก่น", name: "อำเภอพระยืน", district_number: 3, status: "open" },
  // ชลบุรี
  { id: 24, province: "ชลบุรี", name: "อำเภอเมืองชลบุรี", district_number: 1, status: "open" },
  { id: 25, province: "ชลบุรี", name: "อำเภอบ้านบึง", district_number: 2, status: "open" },
  { id: 26, province: "ชลบุรี", name: "อำเภอศรีราชา", district_number: 3, status: "open" },
  // สงขลา
  { id: 27, province: "สงขลา", name: "อำเภอเมืองสงขลา", district_number: 1, status: "open" },
  { id: 28, province: "สงขลา", name: "อำเภอหาดใหญ่", district_number: 2, status: "open" },
  // ภูเก็ต
  { id: 29, province: "ภูเก็ต", name: "อำเภอเมืองภูเก็ต", district_number: 1, status: "open" },
  { id: 30, province: "ภูเก็ต", name: "อำเภอกะทู้", district_number: 2, status: "open" },
];

// ===================== พรรคการเมือง (Parties) =====================
export const mockParties = [
  { id: 1, name: "พรรคก้าวไกล", policy: "นโยบายปฏิรูปการเมือง ลดความเหลื่อมล้ำ สร้างรัฐสวัสดิการ ปฏิรูปกองทัพ แก้ไขรัฐธรรมนูญ กระจายอำนาจสู่ท้องถิ่น" },
  { id: 2, name: "พรรคเพื่อไทย", policy: "นโยบายเศรษฐกิจดิจิทัล Digital Wallet กระตุ้นเศรษฐกิจ แก้ปัญหาหนี้สิน ส่งเสริม Soft Power สร้างรายได้สู่ประชาชน" },
  { id: 3, name: "พรรคประชาธิปัตย์", policy: "นโยบายสร้างความเข้มแข็งให้ชุมชน ปฏิรูปการศึกษา พัฒนาเศรษฐกิจฐานราก ส่งเสริม SMEs ดูแลสิ่งแวดล้อม" },
  { id: 4, name: "พรรคภูมิใจไทย", policy: "นโยบายกัญชาเสรี ส่งเสริมการท่องเที่ยว พัฒนาโครงสร้างพื้นฐาน สนับสนุนเกษตรกร ค่าแรงขั้นต่ำ" },
  { id: 5, name: "พรรคพลังประชารัฐ", policy: "นโยบายบัตรสวัสดิการแห่งรัฐ ส่งเสริมผู้สูงอายุ ลดค่าไฟ ค่าน้ำ พัฒนาสาธารณสุข สร้างงานสร้างอาชีพ" },
  { id: 6, name: "พรรครวมไทยสร้างชาติ", policy: "นโยบายสานต่อโครงการรัฐ พัฒนาเศรษฐกิจอย่างยั่งยืน สร้างความมั่นคง ส่งเสริมการลงทุน พัฒนาดิจิทัล" },
  { id: 7, name: "พรรคชาติไทยพัฒนา", policy: "นโยบายพัฒนาชนบท ส่งเสริมเกษตรกรรม สร้างแหล่งน้ำ พัฒนาถนนหนทาง ดูแลราคาพืชผล" },
  { id: 8, name: "พรรคประชาชาติ", policy: "นโยบายส่งเสริมความหลากหลายทางวัฒนธรรม แก้ปัญหาสามจังหวัดชายแดนใต้ สร้างสันติภาพ พัฒนาการศึกษา" },
];

// ===================== ผู้สมัคร (Candidates) =====================
export const mockCandidates = [
  // เขต 1 กรุงเทพ
  { id: 1, title: "นาย", first_name: "สมชาย", last_name: "วงศ์ดี", party_id: 1, party_name: "พรรคก้าวไกล", constituency_id: 1, province: "กรุงเทพมหานคร", district_number: 1, number: 1 },
  { id: 2, title: "นาง", first_name: "วิภา", last_name: "สุขใจ", party_id: 2, party_name: "พรรคเพื่อไทย", constituency_id: 1, province: "กรุงเทพมหานคร", district_number: 1, number: 2 },
  { id: 3, title: "นาย", first_name: "ประเสริฐ", last_name: "แก้วมณี", party_id: 3, party_name: "พรรคประชาธิปัตย์", constituency_id: 1, province: "กรุงเทพมหานคร", district_number: 1, number: 3 },
  { id: 4, title: "นางสาว", first_name: "กมลวรรณ", last_name: "รัตนา", party_id: 4, party_name: "พรรคภูมิใจไทย", constituency_id: 1, province: "กรุงเทพมหานคร", district_number: 1, number: 4 },
  // เขต 2 กรุงเทพ
  { id: 5, title: "นาย", first_name: "ธีรพงษ์", last_name: "ศรีสว่าง", party_id: 1, party_name: "พรรคก้าวไกล", constituency_id: 2, province: "กรุงเทพมหานคร", district_number: 2, number: 1 },
  { id: 6, title: "นาย", first_name: "พิชัย", last_name: "ทองคำ", party_id: 2, party_name: "พรรคเพื่อไทย", constituency_id: 2, province: "กรุงเทพมหานคร", district_number: 2, number: 2 },
  { id: 7, title: "นางสาว", first_name: "สุนีย์", last_name: "จันทร์แจ้ง", party_id: 5, party_name: "พรรคพลังประชารัฐ", constituency_id: 2, province: "กรุงเทพมหานคร", district_number: 2, number: 3 },
  // เขต 3 กรุงเทพ
  { id: 8, title: "นาย", first_name: "อนุชา", last_name: "พลเดช", party_id: 1, party_name: "พรรคก้าวไกล", constituency_id: 3, province: "กรุงเทพมหานคร", district_number: 3, number: 1 },
  { id: 9, title: "นาง", first_name: "นิภา", last_name: "ดวงตา", party_id: 3, party_name: "พรรคประชาธิปัตย์", constituency_id: 3, province: "กรุงเทพมหานคร", district_number: 3, number: 2 },
  // เชียงใหม่ เขต 1
  { id: 10, title: "นาย", first_name: "เจษฎา", last_name: "ไชยวงค์", party_id: 1, party_name: "พรรคก้าวไกล", constituency_id: 11, province: "เชียงใหม่", district_number: 1, number: 1 },
  { id: 11, title: "นางสาว", first_name: "พิมพ์ใจ", last_name: "ธรรมชาติ", party_id: 2, party_name: "พรรคเพื่อไทย", constituency_id: 11, province: "เชียงใหม่", district_number: 1, number: 2 },
  { id: 12, title: "นาย", first_name: "ณัฐพล", last_name: "แสงจันทร์", party_id: 4, party_name: "พรรคภูมิใจไทย", constituency_id: 11, province: "เชียงใหม่", district_number: 1, number: 3 },
  // เชียงใหม่ เขต 2
  { id: 13, title: "นาย", first_name: "วรวุฒิ", last_name: "ปินตา", party_id: 2, party_name: "พรรคเพื่อไทย", constituency_id: 12, province: "เชียงใหม่", district_number: 2, number: 1 },
  { id: 14, title: "นางสาว", first_name: "มาลี", last_name: "ศรีวิชัย", party_id: 1, party_name: "พรรคก้าวไกล", constituency_id: 12, province: "เชียงใหม่", district_number: 2, number: 2 },
  // นครราชสีมา เขต 1
  { id: 15, title: "นาย", first_name: "ชัยวัฒน์", last_name: "โพธิ์ทอง", party_id: 2, party_name: "พรรคเพื่อไทย", constituency_id: 16, province: "นครราชสีมา", district_number: 1, number: 1 },
  { id: 16, title: "นาง", first_name: "รัชนี", last_name: "เกษมสุข", party_id: 4, party_name: "พรรคภูมิใจไทย", constituency_id: 16, province: "นครราชสีมา", district_number: 1, number: 2 },
  { id: 17, title: "นาย", first_name: "สุทธิพงษ์", last_name: "คงมั่น", party_id: 5, party_name: "พรรคพลังประชารัฐ", constituency_id: 16, province: "นครราชสีมา", district_number: 1, number: 3 },
  // ขอนแก่น เขต 1
  { id: 18, title: "นาย", first_name: "บุญมี", last_name: "สิงห์ทอง", party_id: 2, party_name: "พรรคเพื่อไทย", constituency_id: 21, province: "ขอนแก่น", district_number: 1, number: 1 },
  { id: 19, title: "นางสาว", first_name: "อรทัย", last_name: "ดีใจ", party_id: 1, party_name: "พรรคก้าวไกล", constituency_id: 21, province: "ขอนแก่น", district_number: 1, number: 2 },
  // ชลบุรี เขต 1
  { id: 20, title: "นาย", first_name: "วิทยา", last_name: "เจริญรัตน์", party_id: 4, party_name: "พรรคภูมิใจไทย", constituency_id: 24, province: "ชลบุรี", district_number: 1, number: 1 },
  { id: 21, title: "นาย", first_name: "กิตติ", last_name: "พงศ์พันธ์", party_id: 1, party_name: "พรรคก้าวไกล", constituency_id: 24, province: "ชลบุรี", district_number: 1, number: 2 },
  // สงขลา เขต 1
  { id: 22, title: "นาย", first_name: "มนตรี", last_name: "หมัดอาดำ", party_id: 8, party_name: "พรรคประชาชาติ", constituency_id: 27, province: "สงขลา", district_number: 1, number: 1 },
  { id: 23, title: "นาง", first_name: "ซากีนา", last_name: "หวังผล", party_id: 2, party_name: "พรรคเพื่อไทย", constituency_id: 27, province: "สงขลา", district_number: 1, number: 2 },
  // ภูเก็ต เขต 1
  { id: 24, title: "นาย", first_name: "อภิชาติ", last_name: "เรืองศรี", party_id: 1, party_name: "พรรคก้าวไกล", constituency_id: 29, province: "ภูเก็ต", district_number: 1, number: 1 },
  { id: 25, title: "นางสาว", first_name: "นภัสสร", last_name: "แก้วใส", party_id: 6, party_name: "พรรครวมไทยสร้างชาติ", constituency_id: 29, province: "ภูเก็ต", district_number: 1, number: 2 },
];

// ===================== ผลการเลือกตั้งรายเขต (Constituency Results) =====================
export function getMockConstituencyResults(constituencyId) {
  const id = Number(constituencyId);
  const constituency = mockConstituencies.find(c => c.id === id);
  const candidates = mockCandidates.filter(c => c.constituency_id === id);

  if (!constituency || candidates.length === 0) {
    // สร้างข้อมูลจำลองสำหรับเขตที่ไม่มีผู้สมัครเฉพาะ
    const fallbackConstituency = constituency || { name: `เขตเลือกตั้ง #${id}`, province: "ไม่ทราบ" };
    return {
      constituencyName: `${fallbackConstituency.province} - ${fallbackConstituency.name}`,
      totalVotes: 15000,
      candidates: [
        { id: 101, name: "สมศักดิ์ รักชาติ", party_name: "พรรคก้าวไกล", votes: 5500, vote_count: 5500, percentage: 36.7 },
        { id: 102, name: "ธนิดา พลอยแก้ว", party_name: "พรรคเพื่อไทย", votes: 4200, vote_count: 4200, percentage: 28.0 },
        { id: 103, name: "ประวิทย์ ทองมาก", party_name: "พรรคประชาธิปัตย์", votes: 3100, vote_count: 3100, percentage: 20.7 },
        { id: 104, name: "รัตนา สุขเสริม", party_name: "พรรคภูมิใจไทย", votes: 2200, vote_count: 2200, percentage: 14.6 },
      ]
    };
  }

  // สุ่มผลคะแนนตาม seed constituency id
  const totalVotes = 10000 + (id * 1234) % 15000;
  let remainingVotes = totalVotes;
  const sortedCandidates = [...candidates].sort((a, b) => {
    // ให้ candidate ที่มี id น้อยกว่าได้คะแนนมากกว่า (เพื่อจำลอง)
    return a.number - b.number;
  });

  const resultsWithVotes = sortedCandidates.map((c, i) => {
    const share = i === sortedCandidates.length - 1
      ? remainingVotes
      : Math.floor(remainingVotes * (0.35 - i * 0.08 + (c.party_id % 3) * 0.02));
    const votes = Math.max(share, 100);
    remainingVotes -= votes;
    return {
      id: c.id,
      name: `${c.title}${c.first_name} ${c.last_name}`,
      first_name: c.first_name,
      last_name: c.last_name,
      party: c.party_name,
      party_name: c.party_name,
      votes: votes,
      vote_count: votes,
      percentage: 0
    };
  });

  // Sort by votes descending
  resultsWithVotes.sort((a, b) => b.votes - a.votes);

  // Calculate percentages
  const actualTotal = resultsWithVotes.reduce((sum, c) => sum + c.votes, 0);
  resultsWithVotes.forEach(c => {
    c.percentage = (c.votes / actualTotal) * 100;
  });

  return {
    constituencyName: `${constituency.province} - ${constituency.name}`,
    totalVotes: actualTotal,
    candidates: resultsWithVotes
  };
}

// ===================== ข้อมูลพรรคพร้อมผู้สมัคร (Party Details) =====================
export function getMockPartyDetails(partyId) {
  const id = Number(partyId);
  const party = mockParties.find(p => p.id === id);
  if (!party) return null;

  const candidates = mockCandidates.filter(c => c.party_id === id);

  return {
    id: party.id,
    name: party.name,
    policy: party.policy,
    logoUrl: null,
    candidates: candidates
  };
}

// ===================== ภาพรวมที่นั่งพรรค (Party Overview) =====================
export const mockPartyOverview = {
  totalSeats: 500,
  closedConstituencies: 30,
  parties: [
    { id: 1, name: "พรรคก้าวไกล", seats: 151, logoUrl: null },
    { id: 2, name: "พรรคเพื่อไทย", seats: 141, logoUrl: null },
    { id: 4, name: "พรรคภูมิใจไทย", seats: 71, logoUrl: null },
    { id: 5, name: "พรรคพลังประชารัฐ", seats: 40, logoUrl: null },
    { id: 3, name: "พรรคประชาธิปัตย์", seats: 25, logoUrl: null },
    { id: 6, name: "พรรครวมไทยสร้างชาติ", seats: 36, logoUrl: null },
    { id: 7, name: "พรรคชาติไทยพัฒนา", seats: 10, logoUrl: null },
    { id: 8, name: "พรรคประชาชาติ", seats: 9, logoUrl: null },
  ]
};

// ===================== สำหรับ Vote Ballot (ผู้สมัครในเขตของผู้ใช้) =====================
export function getMockBallotCandidates(constituencyId) {
  const id = Number(constituencyId || 1);
  const candidates = mockCandidates.filter(c => c.constituency_id === id);

  if (candidates.length === 0) {
    // fallback เขต 1 กรุงเทพ
    return mockCandidates.filter(c => c.constituency_id === 1);
  }
  return candidates;
}
