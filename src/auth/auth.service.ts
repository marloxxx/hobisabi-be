import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { AuthDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/database/entities/user.entity';
import { Partner } from 'src/database/entities/partner.entity';
import { Admin } from 'src/database/entities/admin.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Partner)
        private partnerRepository: Repository<Partner>,
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async login(data: AuthDto, model: string) {
        const { email, password } = data;

        let entity;
        if (model === 'user') {
            entity = await this.usersRepository.findOne({ where: { email } });
        } else if (model === 'partner') {
            entity = await this.partnerRepository.findOne({ where: { email } });
        } else if (model === 'admin') {
            entity = await this.adminRepository.findOne({ where: { email } });
        }

        if (entity) {
            const passwordMatches = await argon2.verify(entity.password, password);
            if (!passwordMatches)
                throw new BadRequestException('Password is incorrect');

            const { accessToken, refreshToken } = await this.createTokens(entity.id, entity.email);
            await this.updateRefreshToken(entity.id, refreshToken, model);
            return { accessToken, refreshToken, [model]: entity };
        }


        throw new BadRequestException('Account not found');
    }

    async register(data: RegisterDto): Promise<any> {
        const { email, password, fullname } = data;

        const user = await this.usersRepository.findOne({ where: { email } });
        if (user) {
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await argon2.hash(password);
        const newUser = await this.usersRepository.save({ email, password: hashedPassword, fullname });
        const { accessToken, refreshToken } = await this.createTokens(newUser.id, newUser.email);
        await this.updateRefreshToken(newUser.id, refreshToken, 'user');
        return { accessToken, refreshToken, user: newUser };
    }

    async logout(userId: number, model: string): Promise<void> {
        if (model === 'user') {
            await this.usersRepository.update(userId, { refreshToken: null });
        } else if (model === 'partner') {
            await this.partnerRepository.update(userId, { refreshToken: null });
        } else if (model === 'admin') {
            await this.adminRepository.update(userId, { refreshToken: null });
        }
    }

    async refresh(refreshToken: string, model: string) {
        let entity;
        if (model === 'user') {
            entity = await this.usersRepository.findOne({ where: { refreshToken } });
        } else if (model === 'partner') {
            entity = await this.partnerRepository.findOne({ where: { refreshToken } });
        } else if (model === 'admin') {
            entity = await this.adminRepository.findOne({ where: { refreshToken } });
        }

        if (entity) {
            const { accessToken, refreshToken } = await this.createTokens(entity.id, entity.email);
            await this.updateRefreshToken(entity.id, refreshToken, model);
            return { accessToken, refreshToken, [model]: entity };
        }

        throw new BadRequestException('Invalid refresh token');
    }

    async createTokens(userId: number, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: '7d',
                },
            ),
        ]);

        return { accessToken, refreshToken };
    }

    async updateRefreshToken(userId: number, refreshToken: string, model: string) {
        if (model === 'user') {
            await this.usersRepository.update(userId, { refreshToken });
        } else if (model === 'partner') {
            await this.partnerRepository.update(userId, { refreshToken });
        } else if (model === 'admin') {
            await this.adminRepository.update(userId, { refreshToken });
        }
    }

    async validateUser(payload: any) {
        return { userId: payload.userId, email: payload.email };
    }
}
