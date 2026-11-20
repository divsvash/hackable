export const habits={
 wifi:{label:'On unfamiliar Wi-Fi, I usually',options:[['unknown','prefer not to say'],['verify','check the network name with the venue'],['join','join the one that looks right'],['avoid','use my own connection instead']],responses:{
 unknown:'I cannot see which hotspot you joined or how you chose it. A familiar network name alone is not evidence that its operator is the venue.',
 verify:'You check the network with the venue. That makes a lookalike name less useful to me, though it does not certify the network or every site you visit.',
 join:'Then a convincing network name might be enough to get you connected. I would not need to break HTTPS to put a fake login page in front of you. Confirm the network with the venue, and do not install a profile or ignore a certificate warning just to get online.',
 avoid:'You avoid the unfamiliar hotspot. That removes this particular network from the route, not phishing or every other risk. Keep checking the site address before you sign in.'}},
 charging:{label:'When my battery is low in public, I use',options:[['unknown','prefer not to say'],['own','my own wall charger or power bank'],['port','a shared USB port or attached cable'],['blocked','a trusted charge-only cable or data blocker']],responses:{
 unknown:'A page cannot inspect the cable in your hand. USB can carry power and data. Your own wall charger or power bank avoids trusting a shared USB data connection.',
 own:'You bring the power source. That avoids relying on a public USB data connection. It is a practical boundary, not proof that the phone has never been compromised.',
 port:'Then you are trusting hardware you do not control. That does not mean it has stolen anything. Prefer your own wall charger or power bank, keep the phone updated and decline unexpected requests to trust a computer or transfer data.',
 blocked:'You separate charging from data with an accessory you trust. That reduces this path; it is not a guarantee against every malicious accessory or electrical fault. Keep the phone updated and decline unexpected trust requests.'}}
};
