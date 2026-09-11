import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Williams",
    wardBusiness: [{ description: "Sustaining of new Primary president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: "Sister Brown", topic: "Faith in Jesus Christ", type: "speaker" },
      { name: "Youth Choir", topic: "", type: "musical-number" }
    ],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother Davis",
    announcements: ["Ward temple night: May 10"]
  },
  {
    id: 2,
    date: "2026-05-10",
    meetingType: "testimony",
    presiding: "Bishop Pomerleau",
    conducting: "Brother Kane",
    openingHymn: { number: 1, title: "The Morning Breaks" },
    openingPrayer: "Brother Lee",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 173, title: "While of These Emblems We Partake" },
    speakers: [
      { name: "Congregation", topic: "Testimonies", type: "speaker" }
    ],
    closingHymn: { number: 220, title: "Lord, I Would Follow Thee" },
    closingPrayer: "Sister Clark",
    announcements: ["Youth activity: May 12", "Relief Society service project: May 15"]
  },
  {
    id: 3,
    date: "2026-05-17",
    meetingType: "regular",
    presiding: "Bishop Hernandez",
    conducting: "Brother Miller",
    openingHymn: { number: 85, title: "How Firm a Foundation" },
    openingPrayer: "Sister Gomez",
    wardBusiness: [{ description: "Release and calling of Elders Quorum secretary" }],
    stakeBusiness: true,
    sacramentHymn: { number: 174, title: "While of These Emblems We Partake" },
    speakers: [
      { name: "Brother Adams", topic: "The Atonement", type: "speaker" },
      { name: "Sister Patel", topic: "Charity and Service", type: "speaker" }
    ],
    closingHymn: { number: 100, title: "Nearer, My God, to Thee" },
    closingPrayer: "Brother Nguyen",
    announcements: ["Stake conference next week"]
  },
  {
    id: 4,
    date: "2026-05-24",
    meetingType: "stake",
    presiding: "Stake President Johnson",
    conducting: "Counselor Roberts",
    openingHymn: { number: 5, title: "High on the Mountain Top" },
    openingPrayer: "Sister Rivera",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 180, title: "Father in Heaven, We Do Believe" },
    speakers: [
      { name: "Stake President Johnson", topic: "Strengthening Families", type: "speaker" },
      { name: "Sister Thompson", topic: "Personal Revelation", type: "speaker" },
      { name: "Stake Choir", topic: "", type: "musical-number" }
    ],
    closingHymn: { number: 26, title: "Joseph Smith’s First Prayer" },
    closingPrayer: "Brother Allen",
    announcements: ["Stake youth devotional: June 1"]
  },
  {
    id: 5,
    date: "2026-05-31",
    meetingType: "regular",
    presiding: "Bishop Pomerleau",
    conducting: "Brother Carter",
    openingHymn: { number: 40, title: "Arise, O Glorious Zion" },
    openingPrayer: "Sister Young",
    wardBusiness: [{ description: "Baptism announcement for June 7" }],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: "Jesus of Nazareth, Savior and King" },
    speakers: [
      { name: "Primary Children", topic: "I Am a Child of God", type: "musical-number" },
      { name: "Brother Wilson", topic: "Keeping Covenants", type: "speaker" }
    ],
    closingHymn: { number: 163, title: "Lord, Dismiss Us with Thy Blessing" },
    closingPrayer: "Brother Stewart",
    announcements: ["Ward BBQ: June 14", "Ministering interviews ongoing"]
  }

];

export function getMeetings(date?: string | null): SacramentMeeting[]{
    if (date) return meetings.filter(m => m.date === date);
    return meetings;
};

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find(m => m.id === id) ?? null;  
};