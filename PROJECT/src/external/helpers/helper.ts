export class Helper {
    static calculateAge(birthDate: Date): string {
        const now = new Date();

        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();

        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }

        if (days < 0) {
            months--;
            let temp = new Date(now.getFullYear(), now.getMonth(), 0);
            days = temp.getDate() - birthDate.getDate();
        }

        return `${years}y ${months}m ${days}d`;
    }
}