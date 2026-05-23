export function generateDynamicQRIS(baseQRIS: string, amount: number): string {
    let qris = baseQRIS;
    
    // Check if step 54 exists (amount specified)
    const step54Index = qris.indexOf("54");
    if (step54Index !== -1 && step54Index < qris.indexOf("58")) {
        // If there is an amount already, we should ideally replace it,
        // but typically a static QRIS base does not have step 54.
    } else {
        // Add step 54 (Transaction Amount)
        // Format: "54" + length_of_amount(2 digits) + amount
        const amountStr = String(amount);
        const amountLength = String(amountStr.length).padStart(2, '0');
        const step54 = `54${amountLength}${amountStr}`;
        
        // Find position to insert (usually after 53, before 58)
        const insertPos = qris.indexOf("58");
        if (insertPos !== -1) {
            qris = qris.substring(0, insertPos) + step54 + qris.substring(insertPos);
        } else {
            qris += step54;
        }
    }
    
    // Recalculate CRC
    // CRC is the last 4 characters, preceded by "6304"
    if (qris.endsWith("6304")) {
        // No CRC attached in base, we need to calculate it
        qris += calculateCRC16(qris);
    } else if (qris.includes("6304")) {
        // Replace existing CRC
        const withoutCRC = qris.substring(0, qris.indexOf("6304") + 4);
        qris = withoutCRC + calculateCRC16(withoutCRC);
    }
    
    return qris;
}

function calculateCRC16(payload: string): string {
    let crc = 0xFFFF;
    for (let i = 0; i < payload.length; i++) {
        crc ^= payload.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) > 0) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc = crc << 1;
            }
        }
    }
    crc &= 0xFFFF;
    return crc.toString(16).toUpperCase().padStart(4, '0');
}
