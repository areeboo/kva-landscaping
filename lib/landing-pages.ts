import { content, type Review, type Service } from "@/lib/content";

export type City = (typeof content.business.service_area_zips)[number];

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kvalandscaping.com";

export function citySlug(city: string) {
  return `${city.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-va`;
}

export function findService(slug: string) {
  return content.services.find((service) => service.slug === slug);
}

export function findCity(slug: string) {
  return content.business.service_area_zips.find((city) => citySlug(city.city) === slug);
}

export function cityNames() {
  return content.business.service_area_zips.map((city) => city.city);
}

export function serviceAreaSchema() {
  return content.business.service_area_zips.map((city) => ({
    "@type": "City" as const,
    name: `${city.city}, VA`,
  }));
}

export function offerCatalogSchema() {
  return {
    "@type": "OfferCatalog",
    name: "Landscape services",
    itemListElement: content.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.blurb,
        url: `${siteUrl}/services/${service.slug}`,
      },
    })),
  };
}

export const cityDistanceFromSterling: Record<string, string> = {
  Sterling: "local Sterling routes",
  Herndon: "about 5 miles from Sterling",
  Leesburg: "about 16 miles from Sterling",
  Ashburn: "about 7 miles from Sterling",
  Reston: "about 8 miles from Sterling",
  "Great Falls": "about 10 miles from Sterling",
};

export const cityNeighborhoods: Record<string, string[]> = {
  Sterling: ["Cascades", "Sugarland Run", "Countryside", "Algonkian Pkwy"],
  Herndon: ["Folly Lick Stream", "Chandon", "Floris", "Franklin Farm edge"],
  Leesburg: ["River Creek", "Lansdowne", "Historic Leesburg", "Edwards Ferry Rd"],
  Ashburn: ["Brambleton", "Belmont Country Club", "Loudoun Valley", "Goose Creek"],
  Reston: ["Lake Anne", "South Lakes", "Sunset Hills", "North Reston"],
  "Great Falls": ["Great Falls Village", "River Bend", "Georgetown Pike", "Seneca Road"],
};

type ServiceCopy = {
  h1: string;
  intro: [string, string];
  approachTitle: string;
  approach: string[];
  localTitle: string;
  localProof: string[];
  detailSentences: Record<string, string>;
};

export const serviceCopy: Record<string, ServiceCopy> = {
  "full-service-lawn-care": {
    h1: "Full-Service Lawn Care in Sterling and Loudoun, VA",
    intro: [
      "Good lawn care in Sterling is steady work, not a quick pass with a mower. KVA handles weekly and bi-weekly mowing, edging, trimming, weed control, aeration, overseeding, and seasonal cleanups for homes around Sterling, Herndon, Ashburn, Reston, Leesburg, and Great Falls. The goal is simple: clean lines, healthy turf, and a yard that looks cared for when neighbors walk past.",
      "Nine NoVA seasons have taught the crew how fast clay soil compacts, how quickly a hot July can stress cool-season turf, and how much difference clean edging makes around sidewalks, beds, and driveways. KVA is family-run, local to Sterling, a Thumbtack Top Pro for 2025, and backed by 165+ reviews with a fast response time when you need a walk-through.",
    ],
    approachTitle: "How we approach a lawn care job",
    approach: [
      "A maintenance job starts with a walk of the property. We look at slope, drainage, turf thickness, bed edges, fence gates, sprinkler heads, and the spots that scalp easily. A Sterling split-level off Algonkian Pkwy needs a different mowing rhythm than a newer Ashburn yard with fresh sod and irrigation zones.",
      "During the growing season, the crew focuses on repeatable results: mowing at a height that protects the lawn, trimming without chewing up bark or vinyl fence lines, and edging so the driveway and walkways stay sharp. When the lawn is thin, we talk through aeration, overseeding, or sod instead of pretending mowing alone will fix compacted clay.",
      "Spring and fall cleanups are where the yard gets reset. Leaves, sticks, weeds, and winter debris come out, beds get cleaned, and the lawn is set up for the next stretch of weather. That makes the weekly work cleaner and keeps small issues from becoming a full-yard repair.",
    ],
    localTitle: "Why Sterling, Herndon, Leesburg and Loudoun call us for lawn care",
    localProof: [
      "Sterling routes run through Cascades, Countryside, and Sugarland Run, where older lawns often need careful mowing around mature trees and uneven sidewalks. Herndon yards near Folly Lick Stream and Chandon often need sod, front-yard cleanup, and shrub edges kept under control for HOA standards.",
      "Ashburn and Reston bring their own details: newer irrigation systems, Goose Creek-side drainage, Lake Anne shade, and South Lakes lots where wet areas can rut if a crew rushes. KVA keeps the work practical and local, which is why the same number can handle mowing, mulch, sod, trimming, and the next project when the yard is ready for more.",
    ],
    detailSentences: {
      "Weekly + bi-weekly mowing": "Weekly mowing keeps growth even during spring and early summer, while bi-weekly visits can work for smaller lawns or slower stretches.",
      "Edging + trimming": "Edging and trimming are handled every visit so sidewalks, driveways, fences, and bed borders look finished instead of half-done.",
      "Weed control": "Weed control is scoped around the actual lawn condition, including bed weeds, pavement cracks, and thin turf where weeds keep returning.",
      "Spring + fall cleanups": "Spring and fall cleanups remove leaves, sticks, dead growth, and debris before they smother turf or make mowing messy.",
      "Aeration + overseeding": "Aeration and overseeding help compacted NoVA clay breathe and give thin lawns a better shot at filling in.",
    },
  },
  "mulching": {
    h1: "Mulching in Sterling and Loudoun, VA",
    intro: [
      "Mulch and bed work is where a property starts to look intentional. KVA reshapes beds, cuts clean edges, pulls weeds, installs mulch, lays sod, and helps choose plantings that make sense for Sterling and the wider Loudoun and Fairfax service area. The work is practical: fresh lines, healthy soil, and plants that still look right after a NoVA summer.",
      "The crew works across Sterling, Herndon, Leesburg, Ashburn, Reston, and Great Falls, with a lot of spring and fall bed cleanups for HOA-managed neighborhoods and busy homeowners who need the front yard brought back under control. KVA is family-run, nine years local, a Top Pro 2025 company, and known in reviews for mulch, trimming, cleanup, and good communication.",
    ],
    approachTitle: "How we approach a mulch and planting job",
    approach: [
      "A good bed job starts before the mulch is opened. We clear weeds and old debris, reset the bed line, check how water moves through the area, and look at sun exposure. Heavy clay near Sterling and Ashburn can hold water, while wooded Great Falls lots can dry out under mature tree roots. The prep decides how long the finished work holds.",
      "Mulch depth matters. Too thin and weeds come back fast; too thick around trunks and shrubs can trap moisture where it should not. KVA installs mulch cleanly against brick, stone, paver walkways, and lawn edges, then cleans the hard surfaces so the job looks done when the crew leaves.",
      "For planting, we keep the conversation grounded in what the site can support. Deer pressure, HOA rules, shade from mature trees, and freeze-thaw cycles all matter. The goal is not to overfill a bed on day one; it is to plant something that can settle in, grow, and still be maintainable next season.",
    ],
    localTitle: "Why Sterling, Herndon, Leesburg and Loudoun call us for bed work",
    localProof: [
      "Sterling homeowners in Cascades and Countryside often call for front-bed refreshes, sod patches, and cleaner borders before spring growth takes off. Herndon properties near Folly Lick Stream, Chandon, and Floris tend to need seasonal mulch, shrub shaping, and weed removal that keeps brick colonials looking sharp without making the yard feel overdone.",
      "Reston brings HOA-managed properties near Lake Anne and South Lakes, where clean mulch and controlled shrubs matter. Ashburn and Leesburg add newer builds, larger beds, and drainage-sensitive clay. KVA has enough range to handle a small cleanup, a full-yard refresh, or the planting phase after a patio or walkway project.",
    ],
    detailSentences: {
      "Mulch (hardwood + dyed)": "Hardwood and dyed mulch are installed at a clean, useful depth, with edges and hard surfaces cleaned before the crew leaves.",
      "Bed reshaping + edging": "Bed reshaping and edging give the yard a crisp outline and make future mowing and trimming cleaner.",
      "Seasonal planting": "Seasonal planting is matched to sun, shade, drainage, deer pressure, and the look of the house.",
      "Sod installation": "Sod installation includes cleanup and grading basics so new turf sits smooth and has a better chance to root.",
      "Weed removal + cleanup": "Weed removal and cleanup reset crowded beds before mulch covers the soil and locks in the finished look.",
    },
  },
  "paver-patios": {
    h1: "Paver Patios & Remodels in Sterling and Loudoun, VA",
    intro: [
      "A paver patio or walkway has to survive more than the first weekend after installation. In Sterling and Loudoun, it has to handle clay soil, drainage, freeze-thaw cycles, tree roots, foot traffic, and the occasional HOA review. KVA builds and re-levels patios, walkways, steps, retaining walls, and stone borders for homeowners who want the work done carefully the first time.",
      "This is one of the clearest proof points in KVA reviews: customers call out a backyard paver patio, attached walkways, and existing patios brought back to clean and level. The crew is family-run, nine years local, Top Pro 2025, and based in Sterling, with hardscape work across Herndon, Leesburg, Ashburn, Reston, and Great Falls.",
    ],
    approachTitle: "How we approach a hardscape job",
    approach: [
      "Hardscape work starts with grade and water. Before talking pattern or color, KVA looks at where water goes, what the patio will tie into, whether the site needs steps or a retaining edge, and whether the base can be built properly. On Loudoun clay, shortcuts usually show up after a winter or two as low spots, lifted edges, or joints that wash out.",
      "For new patios and walkways, the crew scopes excavation, base prep, compaction, edge restraint, cuts, and transitions to existing doors, lawns, or beds. For re-leveling, the job is more surgical: lift the settled area, correct the base, clean the pavers, and reset the surface so it looks like the homeowner remembered it before settling and weeds took over.",
      "HOA approval is part of the reality in Ashburn, Reston, and many Sterling neighborhoods. KVA keeps the plan understandable, with material choices and project boundaries clear enough for the homeowner to submit without guessing. The result should feel built into the property, not dropped on top of it.",
    ],
    localTitle: "Why Sterling, Herndon, Leesburg and Loudoun call us for patios",
    localProof: [
      "Sterling split-level homes off Algonkian Pkwy often need patio re-leveling, walkway repairs, and stone borders that respect older grades. Leesburg work in River Creek, Lansdowne, and the historic district often requires more planning around access, drainage, and existing mature landscaping.",
      "Ashburn projects in Brambleton, Belmont Country Club, and Loudoun Valley commonly run through HOA expectations and newer construction drainage patterns. Great Falls lots near Georgetown Pike and River Bend can add long walks, wooded slopes, and freeze-thaw movement. KVA keeps those local details in the build plan instead of treating every patio like the same flat square.",
    ],
    detailSentences: {
      "Paver patios": "Paver patios are planned around grade, base depth, drainage, edge restraint, and the way the space will actually be used.",
      "Walkways + steps": "Walkways and steps are tied cleanly into doors, driveways, lawns, and planting beds so transitions feel natural.",
      "Retaining walls": "Retaining walls are scoped for soil pressure, drainage behind the wall, and a finished edge that fits the yard.",
      "Re-leveling existing hardscape": "Re-leveling existing hardscape can save a patio or walkway that settled, heaved, or collected weeds in the joints.",
      "Stone borders": "Stone borders define beds, lawns, and hardscape edges while making maintenance easier for the seasons ahead.",
    },
  },
  "tree-trimming-removal": {
    h1: "Tree Trimming & Removal in Sterling and Loudoun, VA",
    intro: [
      "Tree and shrub work changes the whole shape of a yard. KVA handles pruning, shaping, shrub installation, storm cleanup, tree removal, and stump removal for Sterling-area homes that need clean lines without hacked-up plants. The work is especially useful around brick colonials, HOA-managed front yards, shaded Reston lots, and older Sterling properties with mature trees.",
      "The crew is family-run, nine years local, and used to the way NoVA landscapes grow: boxwoods that need shaping, overgrown foundation shrubs, storm debris after summer weather, and beds where new shrubs need enough room to settle in. KVA brings the same practical standard here as it does to patios, mulch, mowing, and irrigation.",
    ],
    approachTitle: "How we approach a tree and shrub job",
    approach: [
      "A pruning job starts with plant health and sight lines. We look at what needs to come off, what should stay, and how the shrub will look after new growth fills in. The point is to shape the plant, not punish it. Around walkways and driveways, that also means clearing the path without leaving a bare, chopped-up face.",
      "Shrub installation is planned around mature size, deer pressure, shade, drainage, and the style of the house. A tight bed near a Sterling split-level, a shaded Reston property, and a wide Great Falls lot all call for different spacing and maintenance expectations. KVA keeps those choices plain so the homeowner knows what they are getting.",
      "When storms leave limbs down or a tree needs to come out, the crew focuses on cleanup and access. We protect lawn areas as much as possible, remove debris, and leave the yard ready for the next step, whether that is stump removal, sod, mulch, or a replacement planting.",
    ],
    localTitle: "Why Sterling, Herndon, Leesburg and Loudoun call us for shrub care",
    localProof: [
      "Herndon properties in Chandon and Floris often call for tree and shrub maintenance around brick fronts, porch beds, and fence lines. Reston yards near Lake Anne and South Lakes usually bring shade, HOA expectations, and mature plantings that need careful shaping instead of a one-size-fits-all trim.",
      "Sterling and Leesburg jobs often pair shrub work with mulch, paver walkways, and front-yard cleanup. Great Falls lots can add wooded edges and storm cleanup after heavy weather. KVA can handle the trimming and the surrounding landscape work, which keeps homeowners from coordinating multiple crews for one yard.",
    ],
    detailSentences: {
      "Pruning + shaping": "Pruning and shaping keep shrubs healthy, off walkways, and in proportion with the house.",
      "Tree removal": "Tree removal is handled with attention to access, debris, and what the surrounding lawn or beds need afterward.",
      "Shrub installation": "Shrub installation accounts for mature size, sun, shade, drainage, and deer pressure before plants go in.",
      "Storm cleanup": "Storm cleanup clears fallen limbs, scattered debris, and damaged growth after summer storms or winter weather.",
      "Stump removal": "Stump removal opens up usable bed or lawn space and helps prevent an old removal from becoming a permanent obstacle.",
    },
  },
  "sprinkler-installation": {
    h1: "Sprinkler & Irrigation Installation in Sterling and Loudoun, VA",
    intro: [
      "Irrigation should water the lawn and beds, not the driveway, sidewalk, or side of the house. KVA installs new sprinkler systems, repairs existing zones, handles seasonal start-up and winterization, and diagnoses drainage problems for Sterling-area homeowners who want fewer dry patches and fewer surprise leaks.",
      "The crew works across Sterling, Herndon, Leesburg, Ashburn, Reston, and Great Falls, with a lot of irrigation needs tied to newer Ashburn builds, sod installs, and yards where clay soil holds water in one area but dries out hard in another. KVA is family-run, nine years local, a Top Pro 2025 company, and known for practical communication before and during the job.",
    ],
    approachTitle: "How we approach an irrigation job",
    approach: [
      "An irrigation job starts by checking coverage, pressure, zones, slope, and the plants or turf being watered. We look for heads spraying pavement, areas that stay soggy, dry strips that never catch up, and controller settings that do not match the season. The answer is often adjustment and repair, not a full replacement.",
      "For new systems, KVA plans zones around how the property actually behaves. Turf, beds, slopes, shade, and sunny front yards need different coverage. On NoVA clay, overwatering can be just as damaging as underwatering, especially near patios, foundations, and low spots where water already sits.",
      "Seasonal service matters here. Start-up checks find broken heads and weak zones before summer stress hits. Winterization protects lines before freeze-thaw cycles can damage the system. That keeps the yard easier to maintain and protects the investment in sod, mulch, shrubs, and planting beds.",
    ],
    localTitle: "Why Sterling, Herndon, Leesburg and Loudoun call us for irrigation",
    localProof: [
      "Ashburn homes near Goose Creek, Brambleton, and Loudoun Valley often have newer systems that still need tuning as lawns settle and plantings mature. Sterling and Herndon yards may need repairs after years of mower hits, shifting soil, or heads that no longer cover the right areas.",
      "Reston and Great Falls properties can be trickier because shade, mature trees, long beds, and sloped sections change water needs across one yard. KVA keeps irrigation connected to the rest of the landscape plan, so watering supports the lawn, beds, shrubs, and hardscape instead of working against them.",
    ],
    detailSentences: {
      "New system install": "New system installation is planned by zone so turf, beds, sun, shade, and slope get the right coverage.",
      "Repair + zone diagnosis": "Repair and zone diagnosis find broken heads, weak pressure, leaks, bad coverage, and controller issues.",
      "Seasonal start-up": "Seasonal start-up checks the system before summer heat exposes dry patches or hidden damage.",
      "Winterization": "Winterization protects irrigation lines and heads before NoVA freeze-thaw cycles set in.",
      "Drainage solutions": "Drainage solutions address wet spots, runoff, and water movement that can undermine lawns, beds, and patios.",
    },
  },
  "snow-plowing": {
    h1: "Snow Plowing & Ice Management in Sterling and Loudoun, VA",
    intro: [
      "KVA stays useful after mowing season ends. The same Sterling crew handles seasonal cleanup, residential snow plowing, walkway clearing, ice melt, water features, and outdoor lighting for homeowners who want one reliable number for the yard through the year. The work is practical, local, and built around the way NoVA weather changes from spring growth to winter ice.",
      "Seasonal service matters in Sterling, Herndon, Leesburg, Ashburn, Reston, and Great Falls because yards here deal with leaf drop, clay soil, hard freezes, HOA expectations, and driveways that need clearing before the morning commute. KVA is family-run, nine years local, Top Pro 2025, and backed by 165+ reviews across year-round landscape work.",
    ],
    approachTitle: "How we approach seasonal work",
    approach: [
      "Spring and fall work starts with cleanup. Leaves, dead growth, bed debris, sticks, and weeds come out before they trap moisture or hide problems. Then the crew can reset mulch, trim shrubs, edge beds, and get the property ready for the next season instead of just making one quick pass.",
      "For winter service, route planning matters. KVA handles snow plowing for driveways and walkways with ice melt where it makes sense, especially around Sterling and nearby Reston runs along Sunset Hills. The goal is clear access without tearing up turf edges or pushing snow where it creates a drainage problem later.",
      "Water features and outdoor lighting are handled as site-specific projects. We look at how people move through the yard, where power and water make sense, how the feature will be maintained, and whether it fits the scale of the property. The result should feel like part of the landscape, not an add-on that becomes a chore.",
    ],
    localTitle: "Why Sterling, Herndon, Leesburg and Loudoun call us year-round",
    localProof: [
      "Sterling homeowners often need seasonal work tied to mowing routes, mulch beds, and older properties with leaf-heavy yards. Reston and Great Falls add mature trees, longer drives, and shaded areas where cleanup and ice management matter. Ashburn and Leesburg bring HOA timelines, newer hardscape, and driveways that need careful winter treatment.",
      "Because KVA already handles lawn care, patios, shrubs, irrigation, and mulch, seasonal work fits into the same property history. The crew can spot what changed since the last visit and recommend the next practical step without turning every seasonal cleanup into a sales pitch.",
    ],
    detailSentences: {
      "Driveway + walkway snow plowing": "Driveway and walkway snow plowing is routed locally so access gets cleared without unnecessary lawn damage.",
      "Ice melt application": "Ice melt application is used where it helps safety, especially on walks, steps, and shaded hardscape.",
      "Water feature design + install": "Water feature design and installation are scaled to the yard, power access, water access, and maintenance expectations.",
      "Outdoor lighting": "Outdoor lighting improves paths, patios, steps, and focal points without overpowering the property.",
    },
  },
};

type CityCopy = {
  intro: [string, string];
  where: string[];
};

export const cityCopy: Record<string, CityCopy> = {
  Sterling: {
    intro: [
      "KVA Landscaping is based in Sterling, so this is the home route: weekly mowing through Cascades, Sugarland Run, and Countryside; paver repairs near Algonkian Pkwy; and quick walk-throughs for homeowners who want a real number without waiting a week. The crew handles lawn care, patios, mulch, planting, irrigation, tree and shrub work, seasonal cleanup, and snow service from one local number.",
      "Sterling yards often mix older grading, mature trees, clay soil, and HOA expectations. A clean mow matters, but so does knowing when a low spot needs drainage, when a walkway has settled, and when a bed edge needs to be reshaped before mulch goes down. KVA brings nine local years, family-run service, Top Pro 2025 proof, and 165+ reviews to that day-to-day work.",
    ],
    where: [
      "Cascades, Sugarland Run, and Countryside are regular service areas for mowing, edging, mulch, shrub work, and seasonal cleanup.",
      "Older split-levels and colonials off Algonkian Pkwy often call for paver re-leveling, walkway repairs, sod patches, and front-bed refreshes.",
      "Sterling ZIPs 20164, 20165, and 20166 are close enough for fast estimates and repeat maintenance routes.",
    ],
  },
  Herndon: {
    intro: [
      "KVA works Herndon yards where tidy front lawns, clean foundation beds, and practical maintenance make a visible difference. Homeowners call for lawn care, sod, mulch, seasonal planting, paver walkways, shrub shaping, and irrigation repairs, especially around brick colonials and established neighborhoods near Folly Lick Stream, Chandon, and Floris.",
      "Herndon properties can be deceptively detailed: shaded side yards, compacted clay, narrow access, HOA standards, and beds that need trimming before mulch ever looks right. KVA keeps the work plainspoken and grounded, with a family-run Sterling crew, nine years local, Top Pro 2025 status, 165+ reviews, and a response time that is usually around an hour during business hours.",
    ],
    where: [
      "Folly Lick Stream-area yards often need front-yard sod, bed cleanup, and drainage-aware maintenance.",
      "Chandon and Floris properties are a fit for shrub shaping, seasonal mulch, and regular edging around brick walks and driveways.",
      "Herndon ZIPs 20170 and 20171 sit about 5 miles from Sterling, keeping estimates and recurring work practical.",
    ],
  },
  Leesburg: {
    intro: [
      "Leesburg calls often start with bigger projects: hardscape installs, patio re-leveling, walkway repairs, and long-haul maintenance for homeowners and property managers. KVA works in River Creek, Lansdowne, the historic district, and along Edwards Ferry Rd, where access, grade, mature landscaping, and material choices all matter.",
      "A Leesburg yard can be a newer HOA lot, an established home with tree roots and older stonework, or a historic-district property where every change needs to feel measured. KVA brings nine years of NoVA landscaping experience, a family-run crew, Top Pro 2025 recognition, 165+ reviews, and practical walk-throughs that turn the property conditions into a clear scope.",
    ],
    where: [
      "River Creek and Lansdowne are strong fits for patios, retaining edges, planting beds, and full-yard refreshes.",
      "The historic district often needs careful cleanup, walkway work, and planting decisions that respect older grades and mature trees.",
      "Leesburg ZIPs 20175, 20176, and 20177 are about 16 miles from Sterling; larger hardscape and recurring maintenance routes are planned accordingly.",
    ],
  },
  Ashburn: {
    intro: [
      "Ashburn landscaping usually means newer builds, HOA approvals, bigger bed refreshes, irrigation tuning, and yards that are still settling into Loudoun clay. KVA handles lawn care, mulch, planting, patios, walkways, shrub work, and sprinkler repair in Brambleton, Belmont Country Club, Loudoun Valley, and Goose Creek-side neighborhoods.",
      "The work in Ashburn rewards planning. A paver patio may need HOA paperwork and proper drainage; a new lawn may need irrigation zones adjusted; a mulch job may need sharper bed edges so the front yard meets neighborhood standards. KVA is family-run out of Sterling, nine years local, Top Pro 2025, and backed by 165+ reviews from homeowners who value communication and clean results.",
    ],
    where: [
      "Brambleton and Loudoun Valley are common fits for full-yard refreshes, mulch beds, planting, and lawn maintenance.",
      "Belmont Country Club and Goose Creek-side builds often need irrigation diagnosis, drainage awareness, and HOA-ready hardscape scopes.",
      "Ashburn ZIPs 20147 and 20148 are about 7 miles from Sterling, close enough for ongoing maintenance and fast project walk-throughs.",
    ],
  },
  Reston: {
    intro: [
      "Reston yards bring shade, mature trees, HOA-managed properties, lake-area drainage, and a lot of shrub and mulch work that needs to stay neat without looking overbuilt. KVA handles lawn care, bed cleanups, patios, irrigation, tree and shrub care, seasonal work, and snow runs around Lake Anne, South Lakes, Sunset Hills, and North Reston.",
      "Because Reston landscapes are often established, the right move is not always to rip everything out. Sometimes the job is shaping, cleaning, re-edging, and correcting the one drainage or walkway issue that keeps bothering the homeowner. KVA brings a family-run Sterling crew, nine local years, Top Pro 2025 proof, and 165+ reviews to that kind of practical, careful work.",
    ],
    where: [
      "Lake Anne and South Lakes properties often need mulch, shrub shaping, shade-aware planting, and drainage-sensitive lawn work.",
      "Sunset Hills is part of the seasonal snow route conversation, especially for driveways, walks, and ice-prone hardscape.",
      "Reston ZIPs 20190, 20191, and 20194 are about 8 miles from Sterling, making recurring work realistic across the year.",
    ],
  },
  "Great Falls": {
    intro: [
      "Great Falls landscaping has its own pace: larger wooded lots, longer driveways, deer pressure, drainage questions, and stone or paver work that has to handle slope and freeze-thaw movement. KVA works near Great Falls Village, River Bend, Georgetown Pike, and Seneca Road for homeowners who want careful lawn, bed, patio, irrigation, tree, and seasonal work without a corporate sales routine.",
      "The lots are often beautiful, but they are not simple. Mature trees compete with turf, shaded beds need the right plants, patios and walkways need a base that can handle movement, and winter access can matter on long drives. KVA brings nine years of NoVA work, a family-run Sterling crew, Top Pro 2025 recognition, 165+ reviews, and a practical walk-through before giving a number.",
    ],
    where: [
      "Great Falls Village and Georgetown Pike properties often need careful bed work, stone edges, shrub shaping, and drainage-aware hardscape.",
      "River Bend and Seneca Road-area lots can bring wooded edges, deer pressure, long drives, and seasonal cleanup needs.",
      "Great Falls ZIP 22066 is about 10 miles from Sterling, close enough for larger projects and planned maintenance routes.",
    ],
  },
};

export function serviceReviews(service: Service): Review[] {
  const reviewScores = content.reviews_featured.map((review) => ({
    review,
    score: scoreReview(service.slug, review.text),
  }));

  return reviewScores
    .sort((a, b) => b.score - a.score || reviewYear(b.review.date) - reviewYear(a.review.date))
    .slice(0, 3)
    .map(({ review }) => review);
}

export function recentReviews(count = 4): Review[] {
  return [...content.reviews_featured]
    .sort((a, b) => reviewYear(b.date) - reviewYear(a.date))
    .slice(0, count);
}

function reviewYear(date: string) {
  const match = date.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

function scoreReview(serviceSlug: string, text: string) {
  const lower = text.toLowerCase();
  const keywords: Record<string, string[]> = {
    "lawn-mowing": ["lawn", "mow", "grass", "front and back"],
    "full-service-lawn-care": ["lawn", "mow", "grass", "seed", "front and back"],
    "mulching": ["mulch", "bed", "shrub", "flower bed"],
    "weeding": ["weed", "bed"],
    "gardening": ["garden", "plant", "flower", "design"],
    "tree-shrub-planting": ["plant", "shrub", "tree"],
    "sod-installation": ["sod", "grass", "seed"],
    "paver-patios": ["paver", "patio", "level", "hardscape"],
    "landscape-design": ["landscaping", "walkway", "design", "patio"],
    "tree-trimming-removal": ["tree", "trim", "removal"],
    "shrub-trimming-removal": ["shrub", "trim", "bush"],
    "sprinkler-installation": ["irrigation", "sprinkler", "water"],
    "sprinkler-repair": ["irrigation", "sprinkler", "repair"],
    "well-systems": ["well", "water"],
    "water-feature-installation": ["water feature", "fountain", "pond"],
    "water-feature-repair": ["water feature", "fountain", "pond"],
    "snow-plowing": ["snow", "plow", "ice", "quality", "fair price"],
  };
  return (keywords[serviceSlug] ?? []).reduce(
    (score, keyword) => score + (lower.includes(keyword) ? 2 : 0),
    reviewYear(text),
  );
}
