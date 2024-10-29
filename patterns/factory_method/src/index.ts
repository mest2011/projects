import * as os from 'os';

abstract class System {
    public abstract printMySystemType(): void;
} 

class Windows extends System {
    public printMySystemType(): void {
        console.log('Your system is a Windows');
    }
}

class Mac extends System {
    public printMySystemType(): void {
        console.log('Your system is a Mac');
    }
}

class Linux extends System {
    public printMySystemType(): void {
        console.log('Your system is a Linux');
    }
}

class SystemFactory {
    public static getSystem(): System {
        const platform = os.platform().toLowerCase();

        switch (platform) {
            case 'win32':
                return new Windows();
            case 'darwin':
                return new Mac();
            case 'linux':
                return new Linux();
            default:
                throw new Error('Unknown system');
        }
    }
}

const system = SystemFactory.getSystem();
system.printMySystemType();
