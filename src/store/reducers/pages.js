const initialState = {
  versions: [],
  versionData: {},
  selectedPage: {},
  selectedVersion: { pages: [] },
}

function pagesReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_PAGES':
      let { versions, versionData } = action.payload
      const [selectedVersion] = versionData
      let [selectedPage] = selectedVersion.pages

      return {
        versions,
        versionData,
        selectedVersion,
        selectedPage,
      }
    case 'ADD_COMPONENT':
      let pagesWithSections = state.pages.map(page =>
        page.pageId === action.payload.pageId
          ? {
              ...page,
              sections: [...page.sections, action.payload.section],
            }
          : page,
      )
      return {
        ...state,
        pages: pagesWithSections,
        selectedPage: {
          ...state.selectedPage,
          sections: [
            ...state.selectedPage.sections,
            { ...action.payload.section },
          ],
        },
      }
    case 'SAVE_PAGE':
      console.log('SAVE_PAGE:', state)
      return state
    case 'UPDATE_PAGE_SECTIONS':
      const versionDataWithUpdatedSections = state.versionData.map(version => {
        if (version.name === state.selectedVersion.name) {
          const updatedPages = version.pages.map(page => {
            if (page.name === state.selectedPage.name) {
              return {
                ...page,
                sections: action.sections,
              }
            }
            return page
          })
          return {
            ...version,
            pages: updatedPages,
          }
        }
        return version
      })
      return {
        ...state,
        selectedPage: {
          ...state.selectedPage,
          sections: action.sections,
        },
        versionData: versionDataWithUpdatedSections,
      }
    case 'SELECTED_PAGE':
      let page = state.selectedVersion.pages.find(
        ({ name }) => name === action.name,
      )
      return { ...state, selectedPage: page }
    case 'SELECTED_CATEGORY':
      return { ...state, selectedPage: action.category }
    case 'DELETE_PAGE':
      const freshPages = state.pages.filter(
        ({ pageId }) => pageId !== action.pageId,
      )
      return { ...state, pages: freshPages }
    case 'ADDED_CATEGORY':
      const pagesWithAddedCategory = state.selectedVersion.pages.map(page => {
        if (page.name === state.selectedPage.name) {
          return {
            ...page,
            categories: [...page.categories, action.category],
          }
        }
        return page
      })
      return {
        ...state,
        selectedVersion: {
          ...state.selectedVersion,
          pages: pagesWithAddedCategory,
        },
      }
    case 'REMOVED_CATEGORY':
      let newSelectedVersion
      let newSelectedPage
      const versionDataRemovedCategory = state.versionData.map(version => {
        if (version.name === action.payload.version) {
          const updatedPages = version.pages.map(page => {
            if (page.name === action.payload.page) {
              const categories = page.categories.filter(
                category => category.slug !== action.payload.category,
              )
              newSelectedPage = { ...page, categories }
              return { ...page, categories }
            }
            return page
          })
          newSelectedVersion = {
            ...version,
            pages: updatedPages,
          }
          return {
            ...version,
            pages: updatedPages,
          }
        }
        return version
      })

      return {
        ...state,
        versionData: versionDataRemovedCategory,
        selectedVersion: newSelectedVersion,
        selectedPage: newSelectedPage,
      }
    case 'VERSION_SELECTED':
      const newVersion = state.versionData.find(
        ({ name }) => name === action.version,
      )
      let [newVersionSelectedPage] = newVersion.pages
      return {
        ...state,
        selectedVersion: newVersion,
        selectedPage: newVersionSelectedPage,
      }
    case 'SECTION_REMOVED':
      const updatedSections = state.selectedPage.sections.filter(
        ({ sectionId }) => sectionId !== action.id,
      )
      const selectedVersionPagesMinusSection = state.selectedVersion.pages.map(
        page => {
          if (page.name === state.selectedPage.name) {
            return {
              ...page,
              sections: updatedSections,
            }
          }
          return page
        },
      )
      return {
        ...state,
        selectedPage: {
          ...state.selectedPage,
          sections: updatedSections,
        },
        selectedVersion: {
          ...state.selectedVersion,
          pages: selectedVersionPagesMinusSection,
        },
      }
    case 'SECTION_ADDED':
      const selectedVersionPagesPlusSection = state.selectedVersion.pages.map(
        page => {
          if (page.name === state.selectedPage.name) {
            return {
              ...page,
              sections: [...page.sections, action.section],
            }
          }
          return page
        },
      )
      return {
        ...state,
        selectedPage: {
          ...state.selectedPage,
          sections: [...state.selectedPage.sections, action.section],
        },
        selectedVersion: {
          ...state.selectedVersion,
          pages: selectedVersionPagesPlusSection,
        },
      }
    default:
      return state
  }
}

export default pagesReducer
