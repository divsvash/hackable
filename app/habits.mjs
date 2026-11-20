export const habits={
 wifi:{label:'On unfamiliar Wi-Fi, I usually',options:[['unknown','prefer not to say'],['verify','check the network name with the venue'],['join','join the one that looks right'],['avoid','use my own connection instead']],responses:{
 unknown:'I cannot see which hotspot you joined or how you chose it. A familiar network name alone is not evidence that its operator is the venue.',
 verify:'You check the network with the venue. That makes a lookalike name less useful to me, though it does not certify the network or every site you visit.',
 join:'Then a convincing network name might be enough to get you connected. I would not need to break HTTPS to put a fake login page in front of you. Confirm the network with the venue, and do not install a profile or ignore a certificate warning just to get online.',
 avoid:'You avoid the unfamiliar hotspot. That removes this particular network from the route, not phishing or every other risk. Keep checking the site address before you sign in.'}}
};
