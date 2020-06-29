describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.createUser({ username: 'testi', password:'123456', name: 'Testi Tyyppi' })
        cy.createUser({ username: 'testi2', password:'123456', name: 'Testi Tyyppi 2' })
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in').click()
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function() {
        beforeEach(function() {
            cy.contains('log in').click()
        })

        it('succeeds with correct credentials', function() {
            cy.get('#username').type('testi')
            cy.get('#password').type('123456')
            cy.get('#login-button').click()
            cy.contains('Testi Tyyppi logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('testi')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.contains('wrong username or password')
        })
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.contains('log in').click()
            cy.login({ username: 'testi', password: '123456' })
        })

        it('a new blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('otsikko')
            cy.get('#author').type('author')
            cy.get('#url').type('www.testi.fi')
            cy.contains('submit').click()

            cy.contains('a new blog "otsikko" added by Testi Tyyppi')
            cy.contains('otsikko author')
        })

        describe('and content is available', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'leastLiked', author: 'author', url: 'www.testi.fi' })
                cy.createBlog({ title: 'mostLiked', author: 'author', url: 'www.testi.fi', likes: '10' })
                cy.createBlog({ title: 'littleLiked', author: 'author', url: 'www.testi.fi', likes: '5' })
            })

            it('user can view all the content', function() {
                cy.get('#viewButton').click()
                cy.contains('www.testi.fi')
            })

            it('user can like blog post', function() {
                cy.get('#viewButton').click()
                cy.contains('add like').click()
                cy.contains('likes 11')
            })

            it('user can delete blog post', function() {
                cy.on('window:confirm', () => true)
                cy.get('#viewButton').click()
                cy.get('#removeBlog').click()
                cy.contains('a blog "mostLiked" was removed Testi Tyyppi')
            })

            it('can only remove if blog owner', function() {
                cy.login({ username: 'testi2', password: '123456' })
                cy.get('#viewButton').click()
                cy.get('#removeBlog').should('not.exist')
            })

            it('check that most liked blog is first on the list', function() {
                cy.get('#viewButton').click()
                cy.contains('mostLiked')
            })
        })
    })
})