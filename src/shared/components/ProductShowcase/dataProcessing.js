export function filterNamesByRange(data, range) {
    const alphabet = "A,B,C,Ç,D,E,F,G,Ğ,H,I,İ,J,K,L,M,N,O,Ö,P,Q,R,S,Ş,T,U,Ü,V,W,X,Y,Z".split(",");
    const [start, end] = range.split("-");
    const startIndex = alphabet.indexOf(start);
    const endIndex = alphabet.indexOf(end);

    if (startIndex === -1 || endIndex === -1) {
        console.error("Geçersiz aralık!");
        return [];
    }

    return data.filter(item => {
        const firstLetter = item.name.charAt(0).toUpperCase();
        return alphabet.indexOf(firstLetter) >= startIndex && alphabet.indexOf(firstLetter) <= endIndex;
    });
}

export function filterDataByAlphabetGroups(data) {
    const alphabetGroups = {
        "A-B-C-Ç": [],
        "D-E-F-G": [],
        "Ğ-H-I-İ": [],
        "J-K-L-M": [],
        "N-O-Ö-P": [],
        "Q-R-S-Ş": [],
        "T-U-Ü-V": [],
        "W-X-Y-Z": []
    };

    data.forEach(item => {
        const firstLetter = item.name.charAt(0).toUpperCase();
        for (let group in alphabetGroups) {
            if (group.includes(firstLetter)) {
                alphabetGroups[group].push(item);
                break;
            }
        }
    });

    return Object.values(alphabetGroups);
}