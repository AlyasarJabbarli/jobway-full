import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Starting database seed...')

    // Create admin user
    console.log('Creating admin user...')
    const adminPasswordHash = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: 'Admin User',
        passwordHash: adminPasswordHash,
        role: 'admin',
      },
    })

    // Create moderator user
    console.log('Creating moderator user...')
    const modPasswordHash = await bcrypt.hash('mod123', 10)
    const moderator = await prisma.user.upsert({
      where: { email: 'mod@example.com' },
      update: {},
      create: {
        email: 'mod@example.com',
        name: 'Moderator User',
        passwordHash: modPasswordHash,
        role: 'moderator',
      },
    })

    // Create sample companies
    console.log('Creating sample companies...')
    const companies = await Promise.all([
      prisma.company.create({
        data: {
          name: 'Tech Corp',
          logoUrl: '/placeholder-logo.svg',
          location: 'San Francisco, CA',
          description: 'Leading technology company specializing in innovative solutions',
          website: 'https://techcorp.com',
          email: 'info@techcorp.com',
          phone: '+1-555-123-4567',
          createdById: admin.id,
        },
      }),
      prisma.company.create({
        data: {
          name: 'Digital Solutions',
          logoUrl: '/placeholder-logo.svg',
          location: 'New York, NY',
          description: 'Digital transformation experts helping businesses grow',
          website: 'https://digitalsolutions.com',
          email: 'contact@digitalsolutions.com',
          phone: '+1-555-987-6543',
          createdById: admin.id,
        },
      }),
      prisma.company.create({
        data: {
          name: 'Remote Tech',
          logoUrl: '/placeholder-logo.svg',
          location: 'Remote',
          description: 'Building the future of remote work technology',
          website: 'https://remotetech.com',
          email: 'hello@remotetech.com',
          phone: '+1-555-000-1111',
          createdById: moderator.id,
        },
      }),
    ])

    // Create sample jobs
    console.log('Creating sample jobs...')
    await Promise.all([
      prisma.job.create({
        data: {
          title: 'Senior Software Engineer',
          description: 'Looking for an experienced software engineer to join our team...',
          location: 'San Francisco, CA',
          category: 'Engineering',
          type: 'Full-time',
          experience: '5+ years',
          salary_min: 120000,
          salary_max: 180000,
          is_premium: true,
          companyId: companies[0].id,
          createdById: admin.id,
        },
      }),
      prisma.job.create({
        data: {
          title: 'Product Manager',
          description: 'Seeking a talented product manager to lead our product initiatives...',
          location: 'New York, NY',
          category: 'Product',
          type: 'Full-time',
          experience: '3+ years',
          salary_min: 100000,
          salary_max: 150000,
          is_premium: false,
          companyId: companies[1].id,
          createdById: moderator.id,
        },
      }),
      prisma.job.create({
        data: {
          title: 'Remote Frontend Developer',
          description: 'Join our remote team as a frontend developer...',
          location: 'Remote',
          category: 'Engineering',
          type: 'Full-time',
          experience: '2+ years',
          salary_min: 80000,
          salary_max: 120000,
          is_premium: true,
          companyId: companies[2].id,
          createdById: moderator.id,
        },
      }),
    ])

    console.log('Database has been seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('Failed to seed database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 